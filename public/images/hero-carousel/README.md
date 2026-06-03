# Hero Carousel Image Instructions

## 📁 EXACT FOLDER TO PASTE IMAGES

```
c:\Users\mrant\WINESKIN.CO\public\images\hero-carousel\
```

## ⚡ CONVERT COMMAND

```bash
npm run convert-images
```

## 🎯 HERO COMPONENT LOCATION

```
c:\Users\mrant\WINESKIN.CO\hero-carousel.js
```

---

## How to Add Your Hero Images

### Step 1: Paste Your Images
Copy your images (JPG, PNG, etc.) into:
```
public/images/hero-carousel/
```

### Step 2: Convert to WebP
Run the conversion script:
```bash
npm run convert-images
```

This will:
- Convert all images to WebP format at 85% quality
- Create 4 responsive sizes: 1920w, 1200w, 768w, 480w
- Output to `public/images/hero-carousel/webp/`
- Skip files already converted

### Step 3: Update the Carousel Data
Edit `index.html` and modify the `data-slides` attribute on the hero section:

```html
<section class="hero-carousel" 
         data-hero-carousel
         data-slides='[
           {"src":"images/hero-carousel/webp/your-image-1920.webp","alt":"Your description"},
           {"src":"images/hero-carousel/webp/another-image-1920.webp","alt":"Another description"}
         ]'>
```

---

## Carousel Features

- ✅ **4-second auto-slide** with smooth crossfade transitions
- ✅ **Zero white flash** - double-buffered layers with background color pre-set
- ✅ **Image preloading** - next 2 images load in advance
- ✅ **WebP with fallback** - uses `<picture>` element with original format fallback
- ✅ **Page Visibility API** - pauses when tab is hidden
- ✅ **prefers-reduced-motion** - respects user motion preferences
- ✅ **Full accessibility** - ARIA labels, keyboard navigation, live regions, focus indicators
- ✅ **Touch friendly** - 44px tap targets, swipe support on mobile
- ✅ **Dot indicators** - 8px circles (gold active, white inactive)
- ✅ **Navigation arrows** - gold 24px icons, visible on hover

---

## Keyboard Controls

| Key | Action |
|-----|--------|
| `←` Arrow | Previous slide |
| `→` Arrow | Next slide |
| `Space` | Pause/Resume |
| `Enter` | Pause/Resume |

---

## Supported Image Formats

Input: `.jpg`, `.jpeg`, `.png`, `.gif`, `.bmp`, `.tiff`
Output: `.webp` (with responsive srcset)

---

## Troubleshooting

**Images not showing?**
- Check that images are in `public/images/hero-carousel/`
- Run `npm run convert-images` again
- Check browser console for errors

**Carousel not rotating?**
- Check that `hero-carousel.js` is loaded in index.html
- Verify the `data-hero-carousel` attribute is present

**Want to change slide timing?**
Edit `hero-carousel.js` line 12:
```javascript
const CAROUSEL_CONFIG = {
  interval: 4000,  // Change this value (milliseconds)
  // ...
};
```
