# ImgPreload.js

## Overview
ImgPreload.js is a lightweight JavaScript library designed to efficiently preload and display images, audio, and video files asynchronously on web pages. This library optimizes the loading process, contributing to a smoother user experience by reducing loading times for visual and multimedia content.

## Features
- Asynchronously preloads images, audio, and video files to improve page loading times.
- Enhances user experience by ensuring faster loading of visual and multimedia content.
- Simplified API for easy integration and utilization.

## API Methods

### `preloadAndShowImages()`
Preloads and displays images specified in `<img>` tags with the `data-src` attribute. It also handles background images set via `data-background` attributes on HTML elements.

### `preloadAndApplyBackground()`
Preloads and applies background images to HTML elements with the `data-background` attribute.

### `preloadAndShowMedia()`
Preloads and displays audio and video files specified in `<audio>` and `<video>` tags with the `data-src` attribute.

### Usage Example

#### Using the Script Imported Directly
```html
<!DOCTYPE html>
<html>
<head>
  <title>ImgPreload.js Example</title>
  <script src="path/to/ImgPreload.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', async function() {
      try {
        await window.ImgPreload.preloadAndShowImages();
        console.log('Préchargement des ressources terminé.');
      } catch (error) {
        console.error('Erreur lors du préchargement des ressources :', error);
      }

      try {
        await window.ImgPreload.preloadAndShowMedia();
        console.log('Préchargement et affichage des médias terminés.');
      }catch (error){
        console.error('Erreur lors du préchargement/affichage des médias :', error)
      }
    });
  </script>
</head>
<body>
  <!-- Your HTML content with image, audio, and video elements -->
  <img data-src="path/to/image.jpg" alt="Example Image">
  <div data-background="path/to/background.jpg">Background Div</div>
  <audio controls data-src="path/to/audio.mp3"></audio>
  <video controls data-src="path/to/video.mp4"></video>
</body>
</html>


### Example of use API version
```html
<!DOCTYPE html>
<html>
<head>
  <title>ImgPreload.js Example</title>
  <script src="https://api.quantiumflow.com/ImgPreload.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', async function() {
      try {
        await window.ImgPreload.preloadAndShowImages();
        console.log('Préchargement des ressources terminé.');
      } catch (error) {
        console.error('Erreur lors du préchargement des ressources :', error);
      }

      try {
        await window.ImgPreload.preloadAndShowMedia();
        console.log('Préchargement et affichage des médias terminés.');
      }catch (error){
        console.error('Erreur lors du préchargement/affichage des médias :', error)
      }
    });
  </script>
</head>
<body>
  <!-- Your HTML content with image elements -->
  <img data-src="path/to/image.jpg" alt="Example Image">
  <div data-background="path/to/background.jpg">Background Div</div>
  <audio controls data-src="path/to/audio.mp3"></audio>
  <video controls data-src="path/to/video.mp4"></video>
</body>
</html>
```
