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
  <title>Preloading an image on click</title>
  <script src="https://api.quantiumflow.com/ImgPreload.js"></script>
</head>
<body>
  <button id="preloadButton">Preload an image</button>
  <img data-src="src/image.jpg" alt="Example Image">

  <script>
    const preloadButton = document.getElementById('preloadButton');
    const imgElement = document.querySelector('img[data-src]');

    preloadButton.addEventListener('click', async () => {
      try {
        await window.ImgPreload.preloadAndShowImages(imgElement.getAttribute('data-src'), imgElement);
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
          await window.ImgPreload.preloadAndShowImages(img.getAttribute('data-src'), img);
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

### Example of preloading with priority
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
  <img data-preload-priority="5" data-src="path/to/image.jpg" alt="Example Image">
  <div data-preload-priority="5" data-background="path/to/background.jpg">Background Div</div>
  <audio controls data-preload-priority="1" data-src="path/to/audio.mp3"></audio>
  <video controls data-preload-priority="1" data-src="path/to/video.mp4"></video>
</body>
</html>
```

### Example if you want to configure the preloader
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
        ImgPreload.setCacheDuration(60000); // Sets the cache duration to 60 seconds.
        ImgPreload.setPreloadCacheSize(100); // Sets the maximum cache size to 100 elements.
        ImgPreload.setPreloadMemory(150); // Sets the memory threshold to 150 Megabytes.
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
  <img data-src="src/image.jpg" alt="Example Image">
  <div data-preload-priority="5" data-background="path/to/background.jpg">Background Div</div>
  <audio controls data-src="./src/music1.mp3"></audio>
  <video controls data-src="./src/video1.mp4"></video>
</body>
</html>
```
