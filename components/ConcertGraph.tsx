'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  forceX,
  forceY,
  Simulation,
  SimulationNodeDatum,
  SimulationLinkDatum,
} from 'd3-force';
import { GraphNode, GraphEdge } from '@/app/playground/concert-log/data';

interface SimNode extends SimulationNodeDatum, GraphNode {}
interface SimLink extends SimulationLinkDatum<SimNode> { weight: number; }

interface Props {
  nodes: GraphNode[];
  edges: GraphEdge[];
  satelliteMap: Record<string, string[]>;
}


const SATELLITE_RADIUS = 5;
const ORBIT_RADIUS = 120;
const nodeRadius = (count: number) => Math.sqrt(count) * 6 + 8;

function getNodeId(n: SimNode | string | number): string {
  return typeof n === 'object' ? (n as SimNode).id : String(n);
}

export default function ConcertGraph({ nodes, edges, satelliteMap }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const simRef = useRef<Simulation<SimNode, SimLink> | null>(null);
  const simNodesRef = useRef<SimNode[]>([]);
  const simLinksRef = useRef<SimLink[]>([]);
  const rafRef = useRef<number | null>(null);
  const dragRef = useRef<{ node: SimNode; offsetX: number; offsetY: number } | null>(null);
  const didDragRef = useRef(false);

  const [width, setWidth] = useState(600);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [, forceRender] = useState(0);

  const height = 480;
  const activeId = focusedId ?? hoveredId;

  // Track activeId in a ref so RAF callbacks stay current without restarts
  const activeIdRef = useRef(activeId);
  activeIdRef.current = activeId;
  const focusedIdRef = useRef(focusedId);
  focusedIdRef.current = focusedId;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(entries => {
      const w = entries[0].contentRect.width;
      if (w > 0) setWidth(w);
    });
    observer.observe(container);
    setWidth(container.clientWidth || 600);
    return () => observer.disconnect();
  }, []);

  // Build and start simulation
  useEffect(() => {
    if (!width) return;

    // Stop existing simulation
    simRef.current?.stop();
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const simNodes: SimNode[] = nodes.map(n => ({ ...n }));
    const nodeById = new Map(simNodes.map(n => [n.id, n]));

    const simLinks: SimLink[] = edges
      .map(e => ({
        source: nodeById.get(e.source)!,
        target: nodeById.get(e.target)!,
        weight: e.weight,
      }))
      .filter(l => l.source && l.target);

    simNodesRef.current = simNodes;
    simLinksRef.current = simLinks;

    // Warm-start positions so graph doesn't explode from center
    const sim = forceSimulation<SimNode>(simNodes)
      .force('link', forceLink<SimNode, SimLink>(simLinks).id(d => d.id).distance(80))
      .force('charge', forceManyBody<SimNode>().strength(-80))
      .force('center', forceCenter(width / 2, height / 2).strength(0.08))
      .force('x', forceX(width / 2).strength(0.06))
      .force('y', forceY(height / 2).strength(0.06))
      .force('collide', forceCollide<SimNode>().radius(d => nodeRadius(d.count) + 8))
      .alphaDecay(0.02)
      .velocityDecay(0.4);

    simRef.current = sim;

    // RAF loop — writes positions directly to SVG DOM, no React re-renders
    const tick = () => {
      updateSvgPositions();
      if (sim.alpha() > sim.alphaMin()) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    sim.on('tick', () => {
      for (const n of simNodes) {
        const r = nodeRadius(n.count);
        n.x = Math.max(r + 8, Math.min(width - r - 8, n.x ?? width / 2));
        n.y = Math.max(r + 8, Math.min(height - r - 8, n.y ?? height / 2));
      }
    });

    rafRef.current = requestAnimationFrame(tick);

    // Trigger one React render once sim settles to sync state
    sim.on('end', () => forceRender(v => v + 1));

    return () => {
      sim.stop();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [nodes, edges, width]);

  const updateSvgPositions = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const active = activeIdRef.current;
    const focused = focusedIdRef.current;
    const sNodes = simNodesRef.current;
    const sLinks = simLinksRef.current;

    // Compute connected set
    const connected = new Set<string>();
    if (active) {
      for (const l of sLinks) {
        const src = getNodeId(l.source);
        const tgt = getNodeId(l.target);
        if (src === active) connected.add(tgt);
        if (tgt === active) connected.add(src);
      }
    }

    // Update edges
    const edgeEls = svg.querySelectorAll<SVGLineElement>('[data-edge]');
    edgeEls.forEach((el, i) => {
      const link = sLinks[i];
      if (!link) return;
      const src = typeof link.source === 'object' ? link.source as SimNode : sNodes.find(n => n.id === link.source);
      const tgt = typeof link.target === 'object' ? link.target as SimNode : sNodes.find(n => n.id === link.target);
      if (!src || !tgt) return;
      el.setAttribute('x1', String(src.x ?? 0));
      el.setAttribute('y1', String(src.y ?? 0));
      el.setAttribute('x2', String(tgt.x ?? 0));
      el.setAttribute('y2', String(tgt.y ?? 0));

      const srcId = getNodeId(link.source);
      const tgtId = getNodeId(link.target);
      const isConnectedEdge = !focused || srcId === focused || tgtId === focused;
      const baseOpacity = Math.min(0.15 + link.weight * 0.1, 0.5);
      const edgeOpacity = focused ? (isConnectedEdge ? 0.7 : 0.03) : baseOpacity;
      el.style.opacity = String(edgeOpacity);
      el.style.transition = 'opacity 0.3s';
      el.setAttribute('stroke', isConnectedEdge && focused ? 'var(--foreground)' : 'var(--border)');
    });

    // Update node groups
    const nodeGroups = svg.querySelectorAll<SVGGElement>('[data-node]');
    nodeGroups.forEach(g => {
      const id = g.getAttribute('data-node')!;
      const n = sNodes.find(nd => nd.id === id);
      if (!n) return;
      g.setAttribute('transform', `translate(${n.x ?? 0},${n.y ?? 0})`);

      const isFocused = id === focused;
      const isActive = id === active;
      const isConnected = connected.has(id);
      const dimmed = !!focused && !isActive && !isConnected;

      g.style.opacity = dimmed ? '0.06' : '1';
      g.style.transition = 'opacity 0.3s';

      const ring = g.querySelector<SVGCircleElement>('[data-ring]');
      if (ring) ring.setAttribute('opacity', isFocused ? '0.2' : '0');

      const circle = g.querySelector<SVGCircleElement>('[data-circle]');
      if (circle) {
        circle.setAttribute('fill', isActive ? 'var(--foreground)' : 'var(--tag-bg)');
        circle.setAttribute('stroke', isActive ? 'var(--foreground)' : 'var(--border)');
      }

      const label = g.querySelector<SVGTextElement>('[data-label]');
      if (label) {
        const r = nodeRadius(n.count);
        const showLabel = isActive || isConnected || isFocused;
        label.setAttribute('opacity', showLabel ? '1' : '0');
        label.setAttribute('fill', isActive ? 'var(--foreground)' : 'var(--muted)');
        label.setAttribute('y', String(-(r + 5)));
      }

      const badge = g.querySelector<SVGTextElement>('[data-badge]');
      if (badge) badge.setAttribute('opacity', isFocused ? '1' : '0');
    });

    // Update satellite positions — use capped list to stay in sync with DOM
    const focusedNode = focused ? sNodes.find(n => n.id === focused) : null;
    const satGroups = svg.querySelectorAll<SVGGElement>('[data-satellite]');
    const satEdges = svg.querySelectorAll<SVGLineElement>('[data-sat-edge]');
    const satCount = satGroups.length;

    if (focusedNode && focusedNode.x != null && focusedNode.y != null && satCount > 0) {
      const cx = focusedNode.x;
      const cy = focusedNode.y;

      satGroups.forEach((g, i) => {
        const angle = (i / satCount) * 2 * Math.PI - Math.PI / 2;
        const sx = cx + ORBIT_RADIUS * Math.cos(angle);
        const sy = cy + ORBIT_RADIUS * Math.sin(angle);
        g.setAttribute('transform', `translate(${sx},${sy})`);
        g.setAttribute('opacity', '1');
      });

      satEdges.forEach((el, i) => {
        const angle = (i / satCount) * 2 * Math.PI - Math.PI / 2;
        el.setAttribute('x1', String(cx));
        el.setAttribute('y1', String(cy));
        el.setAttribute('x2', String(cx + ORBIT_RADIUS * Math.cos(angle)));
        el.setAttribute('y2', String(cy + ORBIT_RADIUS * Math.sin(angle)));
        el.setAttribute('opacity', '0.35');
      });
    } else {
      satGroups.forEach(g => g.setAttribute('opacity', '0'));
      satEdges.forEach(el => el.setAttribute('opacity', '0'));
    }
  }, [satelliteMap]);

  // Re-run DOM update when hover/focus changes (sim may be idle)
  useEffect(() => {
    updateSvgPositions();
  }, [hoveredId, focusedId, updateSvgPositions]);

  // SVG coordinate helper
  const svgPoint = (e: React.PointerEvent | PointerEvent) => {
    const svg = svgRef.current!;
    const rect = svg.getBoundingClientRect();
    const scaleX = width / rect.width;
    const scaleY = height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = (e: React.PointerEvent, node: SimNode) => {
    e.stopPropagation();
    const pt = svgPoint(e);
    didDragRef.current = false;
    dragRef.current = {
      node,
      offsetX: pt.x - (node.x ?? 0),
      offsetY: pt.y - (node.y ?? 0),
    };
    (e.currentTarget as Element).setPointerCapture(e.pointerId);

    // Fix node in place while dragging
    node.fx = node.x;
    node.fy = node.y;
    simRef.current?.alphaTarget(0.3).restart();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    didDragRef.current = true;
    const pt = svgPoint(e);
    const { node, offsetX, offsetY } = dragRef.current;
    const r = nodeRadius(node.count);
    node.fx = Math.max(r + 8, Math.min(width - r - 8, pt.x - offsetX));
    node.fy = Math.max(r + 8, Math.min(height - r - 8, pt.y - offsetY));
    updateSvgPositions();
  };

  const handlePointerUp = (e: React.PointerEvent, nodeId: string) => {
    if (!dragRef.current) return;
    const { node } = dragRef.current;
    // Release node — let simulation settle it
    node.fx = null;
    node.fy = null;
    simRef.current?.alphaTarget(0).restart();
    dragRef.current = null;

    if (!didDragRef.current) {
      setFocusedId(prev => prev === nodeId ? null : nodeId);
      setHoveredId(null);
    }
  };

  const MAX_SATELLITES = 10;
  const allSatellites = focusedId ? (satelliteMap[focusedId] ?? []) : [];
  const satellites = allSatellites.slice(0, MAX_SATELLITES);
  const hiddenSatelliteCount = allSatellites.length - satellites.length;
  const sNodes = simNodesRef.current;
  const sLinks = simLinksRef.current;

  const connectedToActive = new Set<string>();
  if (activeId) {
    for (const l of sLinks) {
      const src = getNodeId(l.source);
      const tgt = getNodeId(l.target);
      if (src === activeId) connectedToActive.add(tgt);
      if (tgt === activeId) connectedToActive.add(src);
    }
  }

  const focusedNodeCount = focusedId ? sNodes.find(n => n.id === focusedId)?.count : null;

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={height}
        role="img"
        aria-label="Force-directed graph of artists seen multiple times, connected by shared bills"
        style={{ display: 'block', overflow: 'hidden', cursor: 'default' }}
        onPointerMove={handlePointerMove}
        onClick={() => setFocusedId(null)}
      >
        {/* Satellite edges — hidden until focused node selected */}
        {satellites.map((name, i) => (
          <line
            key={`sat-edge-${name}`}
            data-sat-edge={i}
            stroke="var(--border)"
            strokeWidth={1}
            opacity={0}
            strokeDasharray="3 3"
          />
        ))}

        {/* Main edges */}
        {sLinks.map((link, i) => {
          const baseOpacity = Math.min(0.15 + link.weight * 0.1, 0.5);
          return (
            <line
              key={i}
              data-edge={i}
              stroke="var(--border)"
              strokeWidth={link.weight > 1 ? 2 : 1}
              opacity={baseOpacity}
            />
          );
        })}

        {/* Satellite nodes */}
        {satellites.map((name, i) => (
          <g
            key={`sat-${name}`}
            data-satellite={i}
            opacity={0}
            style={{ cursor: 'default' }}
          >
            <circle
              r={SATELLITE_RADIUS}
              fill="var(--tag-bg)"
              stroke="var(--border)"
              strokeWidth={1}
            />
            <text
              textAnchor="middle"
              y={-(SATELLITE_RADIUS + 5)}
              fontSize="9"
              fontFamily="var(--font-mono)"
              fill="var(--muted)"
              aria-hidden="true"
              style={{ userSelect: 'none', textTransform: 'uppercase', letterSpacing: '0.03em', pointerEvents: 'none' }}
            >
              {name}
            </text>
          </g>
        ))}

        {/* Main nodes */}
        {sNodes.map(node => {
          const r = nodeRadius(node.count);
          return (
            <g
              key={node.id}
              data-node={node.id}
              role="button"
              tabIndex={0}
              aria-label={`${node.id}, seen ${node.count} times`}
              aria-pressed={focusedId === node.id}
              style={{ cursor: 'grab', outline: 'none' }}
              onPointerDown={e => handlePointerDown(e, node)}
              onPointerUp={e => handlePointerUp(e, node.id)}
              onMouseEnter={() => setHoveredId(node.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(node.id)}
              onBlur={() => setHoveredId(null)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setFocusedId(prev => prev === node.id ? null : node.id);
                }
              }}
              onClick={e => e.stopPropagation()}
            >
              <circle data-ring r={r + 6} fill="none" stroke="var(--foreground)" strokeWidth={1} opacity={0} />
              <circle
                data-circle
                r={r}
                fill="var(--tag-bg)"
                stroke="var(--border)"
                strokeWidth={1}
                style={{ transition: 'fill 0.2s, opacity 0.25s' }}
              />
              <text
                data-label
                textAnchor="middle"
                dominantBaseline="auto"
                y={-(r + 5)}
                fontSize="10"
                fontFamily="var(--font-mono)"
                fill="var(--muted)"
                opacity={0}
                aria-hidden="true"
                style={{
                  pointerEvents: 'none',
                  userSelect: 'none',
                  transition: 'opacity 0.25s, fill 0.2s',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                {node.label}
              </text>
              <text
                data-badge
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="10"
                fontFamily="var(--font-mono)"
                fill="var(--background)"
                opacity={0}
                aria-hidden="true"
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              >
                {node.count}
              </text>
            </g>
          );
        })}
      </svg>

      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginTop: 'var(--space-1)', fontFamily: 'var(--font-mono)' }}>
        {focusedId && focusedNodeCount
          ? `${focusedId} · seen ${focusedNodeCount}x · ${connectedToActive.size} shared bills · ${allSatellites.length} other acts${hiddenSatelliteCount > 0 ? ` (+${hiddenSatelliteCount} more)` : ''} — click to deselect`
          : 'Artists seen 2+ times · drag to explore · click to focus'
        }
      </p>
    </div>
  );
}
