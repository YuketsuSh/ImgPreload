# ImgPreload.js

## Overview
ImgPreload.js is a lightweight JavaScript library designed to efficiently preload and display images asynchronously on web pages. This library optimizes the loading process, contributing to a smoother user experience by reducing loading times for visual content.

## Features
- Asynchronously preloads images to improve page loading times.
- Enhances user experience by ensuring faster loading of visual content.
- Simplified API for easy integration and utilization.

## API Methods

### `preloadAndShowImages()`
Preloads and displays images specified in `<img>` tags with the `data-src` attribute. It also handles background images set via `data-background` attributes on HTML elements.

### `preloadAndApplyBackground()`
Preloads and applies background images to HTML elements with the `data-background` attribute.

### `preloadImage(url)`
Used internally to preload individual images. Returns a promise and resolves once the image is successfully loaded.

### `preloadAndShowImage(url, imgE)`
Preloads a specific image and then displays it in the specified HTML image element.

## Usage

### Getting Started
1. Include the `ImgPreload.js` script in your HTML file:
    ```html
    <script src="path/to/ImgPreload.js"></script> or <script src="https://api.quantiumflow.com/ImgPreload.js"></script>
    ```

2. Preload and display images using the provided API methods:
    ```javascript
    // Preload and show images
    window.ImgPreload.preloadAndShowImages();
    ```

### Example of use by importing the script
```html
<!DOCTYPE html>
<html>
<head>
  <title>ImgPreload.js Example</title>
  <script src="path/to/ImgPreload.js"></script>
  <script>
    // Preload and show images on page load
    document.addEventListener('DOMContentLoaded', function() {
      window.ImgPreload.preloadAndShowImages();
    });
  </script>
</head>
<body>
  <!-- Your HTML content with image elements -->
  <img data-src="path/to/image.jpg" alt="Example Image">
  <div data-background="path/to/background.jpg">Background Div</div>
</body>
</html>
```

### Example of use API version
```html
<!DOCTYPE html>
<html>
<head>
  <title>ImgPreload.js Example</title>
  <script src="https://api.quantiumflow.com/ImgPreload.js"></script>
  <script>
    // Calling the preloadAndShowImages method after the DOM is loaded
    document.addEventListener('DOMContentLoaded', async function() {
      try {
        await window.ImgPreload.preloadAndShowImages();
        console.log('Préchargement et affichage des images terminés.');
      } catch (error) {
        console.error('Erreur lors du préchargement des images :', error);
      }
    });
  </script>
</head>
<body>
  <!-- Your HTML content with image elements -->
  <img data-src="path/to/image.jpg" alt="Example Image">
  <div data-background="path/to/background.jpg">Background Div</div>
</body>
</html>
```
