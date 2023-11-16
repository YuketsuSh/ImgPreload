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

**Example Preloading an image with the click of a button**
```html
<!DOCTYPE html>
<html>
<head>
  <title>ImgPreload.js Example</title>
  <script src="https://api.quantiumflow.com/ImgPreload.js"></script>
</head>
<body>
  <!-- Your HTML content with image elements -->
  <button id="preloadButton">Précharger une image</button>
  <img data-src="path/to/image.jpg" alt="Example Image">

  <script>
    const preloadButton = document.getElementById('preloadButton');
    const imgElement = document.querySelector('img[data-src]');

    preloadButton.addEventListener('click', async function() {
      try {
        await window.ImgPreload.preloadAndShowImage(imgElement.getAttribute('data-src'), imgElement);
        console.log('Image préchargée et affichée avec succès !');
      } catch (error) {
        console.error('Erreur lors du préchargement de l\'image :', error);
      }
    });
  </script>
</body>
</html>
```

**Example Preloading videos and music**

```html
<!DOCTYPE html>
<html>
<head>
  <title>ImgPreload.js Example</title>
  <script src="https://api.quantiumflow.com/ImgPreload.js"></script>
</head>
<body>
  <!-- Your HTML content with media elements -->
  <video controls data-src="path/to/video.mp4"></video>
  <audio controls data-src="path/to/audio.mp3"></audio>

  <script>
    document.addEventListener('DOMContentLoaded', async function() {
      try {
        await window.ImgPreload.preloadAndShowMedia();
        console.log('Préchargement et affichage des médias terminés.');
      } catch (error) {
        console.error('Erreur lors du préchargement des médias :', error);
      }
    });
  </script>
</body>
</html>
```

**Preloaded image gallery on hover**
```html
<!DOCTYPE html>
<html>
<head>
  <title>ImgPreload.js Example</title>
  <script src="https://api.quantiumflow.com/ImgPreload.js"></script>
  <style>
    .gallery {
      display: flex;
      flex-wrap: wrap;
    }
    .gallery img {
      width: 200px;
      height: auto;
      margin: 5px;
      transition: transform 0.3s ease;
    }
    .gallery img:hover {
      transform: scale(1.1);
    }
  </style>
</head>
<body>
  <!-- Gallery with images to preload on hover -->
  <div class="gallery">
    <img data-src="path/to/image1.jpg" alt="Image 1">
    <img data-src="path/to/image2.jpg" alt="Image 2">
    <img data-src="path/to/image3.jpg" alt="Image 3">
    <!-- Add more image elements as needed -->
  </div>

  <script>
    const images = document.querySelectorAll('.gallery img');

    images.forEach(img => {
      img.addEventListener('mouseover', async () => {
        try {
          await window.ImgPreload.preloadAndShowImage(img.getAttribute('data-src'), img);
          console.log(`Préchargement et affichage réussis : ${img.getAttribute('data-src')}`);
        } catch (error) {
          console.error(`Erreur lors du préchargement : ${img.getAttribute('data-src')}`, error);
        }
      });
    });
  </script>
</body>
</html>
```

**Example Delayed loading of multimedia resources based on scrolling**

```html
<!DOCTYPE html>
<html>
<head>
  <title>ImgPreload.js Example</title>
  <script src="https://api.quantiumflow.com/ImgPreload.js"></script>
  <style>
    .media-container {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin-top: 1000px; /* Simulate space before scrolling */
    }
    .media-item {
      width: 200px;
      height: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f0f0f0;
    }
    .media-item video,
    .media-item audio {
      max-width: 100%;
      max-height: 100%;
    }
  </style>
</head>
<body>
  <!-- Container for media elements to load on scroll -->
  <div class="media-container">
    <div class="media-item">
      <video controls data-src="path/to/video1.mp4"></video>
    </div>
    <div class="media-item">
      <audio controls data-src="path/to/audio1.mp3"></audio>
    </div>
    <!-- Add more media elements as needed -->
  </div>

  <script>
    let mediaLoaded = false;

    function handleMediaLoading() {
      const mediaElements = document.querySelectorAll('.media-container [data-src]:not([data-loaded])');

      mediaElements.forEach(async media => {
        const rect = media.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0 && !mediaLoaded) {
          try {
            await window.ImgPreload.preloadAndShowMedia();
            media.dataset.loaded = true;
            console.log(`Préchargement et affichage réussis : ${media.getAttribute('data-src')}`);
            mediaLoaded = true;
          } catch (error) {
            console.error(`Erreur lors du préchargement : ${media.getAttribute('data-src')}`, error);
          }
        }
      });
    }

    document.addEventListener('scroll', handleMediaLoading);
    handleMediaLoading(); // Check on page load
  </script>
</body>
</html>
```
