#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const inputFile = process.argv[2];
const outputFile = process.argv[3] || inputFile;

if (!inputFile) {
  console.error('Usage: node optimize-svg.js <input-file> [output-file]');
  process.exit(1);
}

console.log(`Reading: ${inputFile}`);
let svg = fs.readFileSync(inputFile, 'utf8');
const originalSize = svg.length;

// Phase 1: Safe optimizations only
console.log('Applying Phase 1 optimizations...');

// 1. Remove unnecessary whitespace (but preserve space between attributes)
svg = svg.replace(/>\s+</g, '><'); // Remove whitespace between tags
svg = svg.replace(/\s+/g, ' '); // Normalize multiple spaces to single space

// 2. Round decimal numbers to 2 places (conservative)
svg = svg.replace(/(\d+\.\d{3,})/g, (match) => {
  return parseFloat(match).toFixed(2);
});

// 3. Remove XML comments (none found, but just in case)
svg = svg.replace(/<!--[\s\S]*?-->/g, '');

// 4. Remove trailing spaces in attributes
svg = svg.replace(/\s+"/g, '"');
svg = svg.replace(/\s+>/g, '>');

// 5. Remove leading/trailing whitespace
svg = svg.trim();

const newSize = svg.length;
const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(2);

console.log(`Original size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`New size: ${(newSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`Reduction: ${reduction}%`);

fs.writeFileSync(outputFile, svg, 'utf8');
console.log(`Saved to: ${outputFile}`);
