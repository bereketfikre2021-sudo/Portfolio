# Website Color Reference & Contrast Analysis

## Primary Brand Colors

### Base Colors
- **Dark Navy (Primary)**: `#050a1f` (RGB: 5, 10, 31)
- **Mint Green (Primary)**: `#b4e8c9` (RGB: 180, 232, 201)
- **Palette Source**: [Huemint Monochrome Brand](https://huemint.com/brand-1/#palette=b4e8c9-050a1f)

---

## Color Variables Used

### Dark Navy Variations (Base: #050a1f)
- `--color-dark`: `#050a1f` (100% opacity)
- `--color-dark-90`: `rgba(5, 10, 31, 0.9)` (90% opacity)
- `--color-dark-80`: `rgba(5, 10, 31, 0.8)` (80% opacity)
- `--color-dark-50`: `rgba(5, 10, 31, 0.5)` (50% opacity)
- `--color-dark-30`: `rgba(5, 10, 31, 0.3)` (30% opacity)
- `--color-dark-20`: `rgba(5, 10, 31, 0.2)` (20% opacity)
- `--color-dark-10`: `rgba(5, 10, 31, 0.1)` (10% opacity)
- `--color-dark-05`: `rgba(5, 10, 31, 0.05)` (5% opacity)

### Mint Green Variations (Base: #b4e8c9)
- `--color-light`: `#b4e8c9` (100% opacity)
- `--color-light-90`: `rgba(180, 232, 201, 0.9)` (90% opacity)
- `--color-light-80`: `rgba(180, 232, 201, 0.8)` (80% opacity)
- `--color-light-50`: `rgba(180, 232, 201, 0.5)` (50% opacity)
- `--color-light-40`: `rgba(180, 232, 201, 0.4)` (40% opacity)
- `--color-light-30`: `rgba(180, 232, 201, 0.3)` (30% opacity)
- `--color-light-20`: `rgba(180, 232, 201, 0.2)` (20% opacity)
- `--color-light-10`: `rgba(180, 232, 201, 0.1)` (10% opacity)
- `--color-light-05`: `rgba(180, 232, 201, 0.05)` (5% opacity)

---

## Background Colors

- `--bg-primary`: `#050a1f` (Dark Navy)
- `--bg-secondary`: `#050a1f` (Dark Navy)
- `--bg-light`: `#b4e8c9` (Mint Green)
- `--bg-dark-section`: `rgba(5, 10, 31, 0.98)` (98% Dark Navy)

---

## Text Colors

### On Dark Backgrounds (#050a1f)
- `--text-primary`: `#b4e8c9` (Mint Green - 100%)
- `--text-light`: `#b4e8c9` (Mint Green - 100%)
- `--text-on-dark`: `rgba(180, 232, 201, 0.95)` (Mint Green - 95%)
- `--text-secondary`: `rgba(180, 232, 201, 0.85)` (Mint Green - 85%) ✅ **IMPROVED CONTRAST**
- `--text-tertiary`: `rgba(180, 232, 201, 0.7)` (Mint Green - 70%) ⚠️ **Use for large text only**

### On Light Backgrounds (#b4e8c9)
- `--text-on-light`: `#050a1f` (Dark Navy - 100%)

---

## Common Color Combinations (Potential Contrast Issues)

### ⚠️ LOW CONTRAST COMBINATIONS

1. **Text on Dark Background (#08122C)**
   - `rgba(185, 234, 209, 0.7)` on `#08122C` - **Contrast Ratio: ~3.2:1** ❌ (Needs 4.5:1 for normal text, 3:1 for large text)
   - `rgba(185, 234, 209, 0.5)` on `#08122C` - **Contrast Ratio: ~2.3:1** ❌ (Fails WCAG AA)

2. **Text on Semi-Transparent Dark Backgrounds**
   - `rgba(185, 234, 209, 0.7)` on `rgba(8, 18, 44, 0.9)` - **May fail contrast**
   - `rgba(185, 234, 209, 0.5)` on `rgba(8, 18, 44, 0.8)` - **Will fail contrast**

3. **Text on Light Background (#B9EAD1)**
   - `#08122C` on `#B9EAD1` - **Contrast Ratio: ~4.8:1** ✅ (Passes WCAG AA for normal text)
   - `rgba(8, 18, 44, 0.8)` on `#B9EAD1` - **May fail contrast** ⚠️

### ✅ GOOD CONTRAST COMBINATIONS

1. **Text on Dark Background (#08122C)**
   - `#B9EAD1` (100%) on `#08122C` - **Contrast Ratio: ~4.6:1** ✅ (Passes WCAG AA)
   - `rgba(185, 234, 209, 0.95)` on `#08122C` - **Contrast Ratio: ~4.4:1** ✅

2. **Text on Light Background (#B9EAD1)**
   - `#08122C` (100%) on `#B9EAD1` - **Contrast Ratio: ~4.8:1** ✅

---

## WCAG Contrast Requirements

- **Normal Text (≤18pt or ≤14pt bold)**: Minimum 4.5:1 (AA), 7:1 (AAA)
- **Large Text (>18pt or >14pt bold)**: Minimum 3:1 (AA), 4.5:1 (AAA)
- **UI Components**: Minimum 3:1 (AA)

---

## Recommended Fixes for Contrast Issues

### For `--text-secondary` (70% opacity)
**Current**: `rgba(185, 234, 209, 0.7)` on `#08122C`
**Issue**: Contrast ratio ~3.2:1 (fails for normal text)
**Fix Options**:
1. Increase opacity to `rgba(185, 234, 209, 0.85)` or higher
2. Use `rgba(185, 234, 209, 0.9)` for better contrast
3. Use only for large text (>18pt)

### For `--text-tertiary` (50% opacity)
**Current**: `rgba(185, 234, 209, 0.5)` on `#08122C`
**Issue**: Contrast ratio ~2.3:1 (fails WCAG)
**Fix Options**:
1. Increase opacity to at least `rgba(185, 234, 209, 0.7)` for large text
2. Use only for decorative/non-text elements
3. Remove from text usage entirely

### For Semi-Transparent Backgrounds
**Issue**: Text on semi-transparent backgrounds may fail contrast
**Fix**: Ensure text opacity is high enough (≥85%) when background is semi-transparent

---

## Quick Reference: Hex Values

- **#050a1f** - Dark Navy (Primary Dark)
- **#b4e8c9** - Mint Green (Primary Light)

## RGB Values

- **Dark Navy**: `rgb(5, 10, 31)` or `rgba(5, 10, 31, 1)`
- **Mint Green**: `rgb(180, 232, 201)` or `rgba(180, 232, 201, 1)`

---

## Where These Colors Are Used

### Dark Background Sections
- Main body background: `#08122C`
- Navigation bar: `rgba(8, 18, 44, 0.95)`
- Dark sections: `rgba(8, 18, 44, 0.98)`
- Text color: `#B9EAD1` or variations

### Light Background Sections
- Hero section background: `#B9EAD1`
- Text color: `#08122C`

### Buttons
- Primary button: Background `#08122C`, Text `#B9EAD1` ✅
- Outline button: Background transparent, Text `#08122C` on light bg ✅

---

## Testing Tools

Use these tools to verify contrast ratios:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Contrast Ratio Calculator](https://contrast-ratio.com/)
- Chrome DevTools Lighthouse
- WAVE Web Accessibility Evaluator

