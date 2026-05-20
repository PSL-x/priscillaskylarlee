# Accessibility Testing Checklist

## Recent Improvements to Test (2026-03-21)

### 1. Color Contrast (Light Mode)
- [ ] Switch to light mode
- [ ] Check secondary text (muted color) is readable against background
- [ ] Verify all text meets minimum contrast standards
- [ ] Test link underlines are visible

**Expected:** All text should be clearly readable, no squinting required.

---

### 2. Focus Indicators
- [ ] Use Tab key to navigate through the entire site
- [ ] Check focus outline is visible on all interactive elements
- [ ] Verify focus outline is at least 3px thick
- [ ] Test on both dark and light modes

**Pages to test:**
- Homepage (navigation, project cards, links)
- About page (toggle buttons, links)
- Table of Contents (navigation links)
- Sidebar (all navigation)

**Expected:** Clear, thick outline on every focused element.

---

### 3. Table of Contents Widget - Keyboard Navigation

#### Test "What's On These Days" Section:
- [ ] Tab to the "What's On These Days" section
- [ ] Press Enter or Space - widget should expand/collapse
- [ ] Verify focus remains on the button after toggling
- [ ] Tab to the +/- button at bottom
- [ ] Press Enter or Space - widget should expand/collapse
- [ ] Test with both keyboard and mouse

**Expected:** Full keyboard control without needing mouse.

---

### 4. Toggle Buttons (About Page)

#### Full Story / TL;DR Buttons:
- [ ] Navigate to About page
- [ ] Tab to "Full Story" button
- [ ] Press Space or Enter to activate
- [ ] Verify content changes
- [ ] Tab to "TL;DR" button
- [ ] Press Space or Enter to activate
- [ ] Test with screen reader (should announce "pressed" state)

**Expected:** Keyboard navigation works, state changes are announced.

---

### 5. Screen Reader Testing

#### Test with VoiceOver (Mac), NVDA (Windows), or JAWS:

**Table of Contents Widget:**
- [ ] Navigate to widget
- [ ] Verify button is announced as "button"
- [ ] Check "expanded" or "collapsed" state is announced
- [ ] Confirm content changes are detectable

**About Page Toggles:**
- [ ] Navigate to toggle buttons
- [ ] Verify "pressed" or "not pressed" state is announced
- [ ] Confirm active button is clearly identified

**Navigation:**
- [ ] Verify all navigation links are announced with correct labels
- [ ] Check aria-current="page" is announced for active page

**Decorative Elements:**
- [ ] Confirm arrow icons are NOT announced (aria-hidden works)
- [ ] Verify wavy line separator is NOT announced

**Expected:** Screen reader speaks all interactive elements clearly, skips decorative elements.

---

## Keyboard Navigation Test Plan

### Full Site Keyboard Journey:

1. **Start at Homepage**
   - [ ] Press Tab - should focus skip link
   - [ ] Press Enter on skip link - should jump to main content
   - [ ] Continue tabbing through navigation
   - [ ] Tab through project cards - all should be focusable
   - [ ] Tab to "About" link - verify it's reachable

2. **About Page**
   - [ ] Tab to Full Story/TL;DR buttons
   - [ ] Use Space/Enter to toggle between views
   - [ ] Continue to "drop me a line" link

3. **Table of Contents (on desktop 1400px+)**
   - [ ] Tab through TOC navigation links
   - [ ] Tab to "What's On These Days" button
   - [ ] Toggle with Space/Enter
   - [ ] Tab to +/- button
   - [ ] Toggle with Space/Enter

4. **Sidebar Navigation**
   - [ ] Tab through all navigation items
   - [ ] Tab to theme toggle button
   - [ ] Press Space/Enter to change theme
   - [ ] Tab to "Email Me" button (if present)

**Expected:** Every interactive element is reachable and operable with keyboard alone.

---

## Automated Testing Tools

### Browser Extensions to Use:

#### 1. axe DevTools (Free)
- [ ] Install: [https://www.deque.com/axe/devtools/](https://www.deque.com/axe/devtools/)
- [ ] Run on Homepage
- [ ] Run on About page
- [ ] Run on Resume page
- [ ] Check for Critical and Serious issues
- [ ] Review Best Practices suggestions

#### 2. WAVE Web Accessibility Evaluation Tool
- [ ] Install: [https://wave.webanim.com/extension/](https://wave.webanim.com/extension/)
- [ ] Scan all pages
- [ ] Check for errors (red icons)
- [ ] Review contrast issues
- [ ] Verify ARIA usage

#### 3. Lighthouse (Built into Chrome DevTools)
- [ ] Open DevTools (F12)
- [ ] Go to Lighthouse tab
- [ ] Select "Accessibility" category
- [ ] Run audit
- [ ] Aim for 95+ score

**Expected Results:**
- axe DevTools: 0 critical/serious issues
- WAVE: No errors
- Lighthouse: 95+ accessibility score

---

## Manual Visual Tests

### Focus Visibility:
- [ ] Dark mode: Focus outline visible on all elements
- [ ] Light mode: Focus outline visible on all elements
- [ ] High contrast mode (Windows): Focus still works

### Color Contrast:
Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/):
- [ ] Dark mode body text: #e8e8e8 on #1a1a1a
- [ ] Dark mode muted text: #a0a0a0 on #1a1a1a
- [ ] Light mode body text: #1a1a1a on #f5f5f5
- [ ] Light mode muted text: #595959 on #f5f5f5 ← **NEW, should pass 4.5:1**

### Responsive Testing:
- [ ] Mobile (< 768px): All features keyboard accessible
- [ ] Tablet (768-1400px): All features keyboard accessible
- [ ] Desktop (> 1400px): TOC widget keyboard accessible

---

## Screen Reader Testing Guides

### macOS - VoiceOver:
1. Enable: Cmd + F5
2. Navigate: VO + Arrow keys (VO = Ctrl + Option)
3. Activate: VO + Space
4. Stop: Cmd + F5

**Test checklist:**
- [ ] All headings announced with level
- [ ] All buttons announced as "button"
- [ ] Button states (pressed/not pressed) announced
- [ ] Expanded/collapsed states announced
- [ ] Skip link works
- [ ] Form controls have labels

### Windows - NVDA (Free):
1. Download: [https://www.nvaccess.org/download/](https://www.nvaccess.org/download/)
2. Navigate: Arrow keys or Tab
3. Activate: Enter or Space
4. Stop: Insert + Q

**Test checklist:**
- [ ] Same as VoiceOver checklist above

### Mobile Testing:
**iOS VoiceOver:**
- Enable: Settings > Accessibility > VoiceOver
- [ ] Swipe through all elements
- [ ] Double-tap to activate

**Android TalkBack:**
- Enable: Settings > Accessibility > TalkBack
- [ ] Swipe through all elements
- [ ] Double-tap to activate

---

## Browser Testing Matrix

Test in these browsers:

### Desktop:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile:
- [ ] Safari iOS
- [ ] Chrome Android

**For each browser, verify:**
- Focus indicators work
- Keyboard navigation works
- Screen reader compatibility

---

## Regression Testing

### Check these weren't broken:

- [ ] Theme toggle still works
- [ ] Mobile menu opens/closes
- [ ] Skip link still works
- [ ] All links still navigate correctly
- [ ] Project cards still link correctly
- [ ] Images still load with alt text
- [ ] Hover states still work

---

## Priority Issues to Watch For

### Critical (Fix Immediately):
- [ ] Any element not keyboard accessible
- [ ] Focus trap (can't escape with keyboard)
- [ ] Missing button roles on interactive elements
- [ ] Color contrast failures in light mode

### High (Fix Soon):
- [ ] Confusing screen reader announcements
- [ ] Missing ARIA labels on complex widgets
- [ ] Insufficient focus indicators

### Medium (Nice to Have):
- [ ] Inconsistent navigation patterns
- [ ] Missing skip links to subsections
- [ ] No keyboard shortcuts

---

## Success Criteria

✅ **Pass if:**
- All interactive elements keyboard accessible
- Focus visible on all elements (both themes)
- Screen reader announces all states correctly
- Light mode contrast ratios all pass 4.5:1
- Lighthouse accessibility score 95+
- Zero critical issues in axe DevTools

⚠️ **Review if:**
- Lighthouse score 85-94
- Some best practices not followed
- Minor ARIA improvements suggested

❌ **Fail if:**
- Any element not keyboard accessible
- Focus not visible
- Color contrast below 4.5:1
- Screen reader can't navigate site
- Critical issues in automated tests

---

## Quick Manual Test (5 minutes)

**Bare minimum before deployment:**

1. **Keyboard Test:**
   - Tab through entire homepage
   - Can you reach everything?
   - Is focus visible?

2. **Light Mode Test:**
   - Switch to light mode
   - Is all text readable?

3. **Screen Reader Spot Check:**
   - Turn on VoiceOver/NVDA
   - Navigate to Table of Contents widget
   - Toggle it - is state announced?

4. **Automated Scan:**
   - Run Lighthouse
   - Check score is 95+

**Time:** 5 minutes
**If all pass:** Ship it! ✅

---

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Extension](https://wave.webanim.com/extension/)
- [NVDA Screen Reader](https://www.nvaccess.org/)
- [Keyboard Accessibility Guide](https://webaim.org/techniques/keyboard/)

---

## Notes

**What we fixed on 2026-03-21:**
1. Light mode color contrast: #666666 → #595959
2. Focus outline thickness: 2px → 3px
3. TableOfContents: divs → buttons with ARIA
4. Toggle buttons: added aria-pressed
5. Decorative SVGs: added aria-hidden="true"

**Known remaining improvements:**
- Could add focus management when mobile menu opens
- Could add more descriptive aria-labels on some components
- Could improve keyboard shortcuts for power users

---

**Last Updated:** 2026-03-21
**Tester:** _______________
**Date Tested:** _______________
**Result:** ☐ Pass  ☐ Fail  ☐ Needs Review
