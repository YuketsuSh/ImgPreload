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

### `setPreloadMemory(quantity)`
Sets the memory threshold for preloading resources. This method accepts a quantity parameter representing the memory threshold in Megabytes. It sets the `data-preload-memory` attribute for elements like `<img>`, `<audio>`, and `<video>`.

### `setPreloadCacheSize(size)`
Sets the maximum cache size for preloading resources. It accepts a size parameter representing the maximum number of elements to be stored in the cache. This method sets the `data-preload-cache-size` attribute for elements like `<img>`, `<audio>`, and `<video>`.

### `setCacheDuration(durationInMilliseconds)`
Sets the cache duration for resources in milliseconds. It accepts a durationInMilliseconds parameter representing the cache duration in milliseconds. This method sets the `data-cache-duration` attribute for elements like `<img>`, `<audio>`, and `<video>`.

### `setCacheCleanInterval(intervalInMilliseconds)`
Defines the interval duration (in milliseconds) for cleaning the cache. If not provided, it automatically sets the cache cleaning interval to 5 minutes (300,000 milliseconds).

### Example of using the New API Methods

#### Setting Memory Threshold

```javascript
window.ImgPreload.setPreloadMemory(150); // Sets the memory threshold to 150 Megabytes.
```

#### Setting Cache Duration

```javascript
window.ImgPreload.setCacheDuration(60 * 60 * 1000); // 1 hour cache duration
```

#### Setting Cache Size

```javascript
window.ImgPreload.setPreloadCacheSize(100); // Sets the maximum cache size to 100 elements.
```

### Setting Cache Clean Interval

```javascript
window.ImgPreload.setCacheCleanInterval(10 * 60 * 1000); // Sets cache clean interval to 10 minutes
```

Documentation is [here]

