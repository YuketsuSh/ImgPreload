const cache = {};
let maxCacheSize = 50; // Limit of elements in cache
const cacheDuration = 30 * 60 * 1000; // Cache lifetime in milliseconds (here, 30 minutes)
const memoryThreshold = 100; // Memory threshold in megabytes

function preloadImage(url, priority = 1) {
    return new Promise((resolve, reject) => {
        if (cache[url]) {
            console.log(`L'image ${url} est déjà dans le cache.`);
            resolve(cache[url].src);
        } else {
            const img = new Image();
            const resource = { url, priority };
            img.crossOrigin = "Anonymous";
            img.onload = () => {
                cache[url] = { img, resource };
                console.log(`Image ${url} chargée et mise en cache avec priorité ${priority}.`);
                if (Object.keys(cache).length > maxCacheSize) {
                    delete cache[Object.keys(cache)[0]];
                }
                resolve(img.src);
            };
            img.onerror = () => {
                console.error(`Erreur lors du chargement de l'image : ${url}`);
                reject(new Error(`Erreur lors du chargement de l'image : ${url}`));
            };
            img.src = url;
        }
    });
}

function cleanCache() {
    for (const key in cache) {
        if (cache.hasOwnProperty(key)) {
            const currentTime = new Date().getTime();
            const resourceTime = cache[key].cachedTime;
            if (currentTime - resourceTime > cacheDuration) {
                delete cache[key];
                console.log(`La ressource ${key} a été retirée du cache car elle a dépassé la durée de vie.`);
            }
        }
    }
}

function adjustCacheSize() {
    const memoryInfo = window.performance.memory;
    if (memoryInfo && memoryInfo.total) {
        const totalMemoryInMB = memoryInfo.total / (1024 * 1024);
        maxCacheSize = totalMemoryInMB < memoryThreshold ? Math.floor(maxCacheSize * 0.9) : Math.ceil(maxCacheSize * 1.1);
    }
}



async function preloadMedia(url, priority = 1) {
    return new Promise((resolve, reject) => {
      if (cache[url]) {
        resolve(cache[url]);
      } else {
        fetch(url)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Erreur lors du chargement de la ressource : ${url}`);
            }
            return response.blob();
          })
          .then(blob => {
            let mediaElement;
  
            if (url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg')) {
              mediaElement = document.createElement('video');
            } else if (url.endsWith('.mp3') || url.endsWith('.ogg') || url.endsWith('.wav')) {
              mediaElement = document.createElement('audio');
            } else {
              throw new Error(`Format de fichier non pris en charge : ${url}`);
            }
  
            mediaElement.src = URL.createObjectURL(blob);
            mediaElement.oncanplaythrough = () => {
              cache[url] = mediaElement;
              resolve(mediaElement);
            };
            mediaElement.onerror = reject;
          })
          .catch(error => {
            console.error(`Erreur lors du chargement/lecture de la ressource : ${url} - ${error}`);
            reject(error);
          });
      }
    });
  }

async function preloadAndShowImage(url, imgElement) {
    try {
        const priority = imgElement.getAttribute('data-preload-priority') || 1;
        const cachedImage = await preloadImage(url, priority);
        if (cachedImage) {
            imgElement.src = cachedImage;
            console.log(`Préchargement et affichage réussis : ${url}`);
        } else {
            console.error(`Erreur lors du préchargement : ${url}`);
        }
    } catch (error) {
        console.error(`Erreur lors du préchargement : ${url}`, error);
        throw new Error(`Erreur lors du préchargement : ${url}`);
    }
}

async function preloadAndShowMediaResource(url, mediaElement) {
    try {
        if (!cache[url]) {
            const cachedMedia = await preloadMedia(url);
            cache[url] = cachedMedia;
        }
        const priority = mediaElement.getAttribute('data-preload-priority') || 1;
        mediaElement.src = cache[url].src;
        console.log(`Préchargement et affichage réussis : ${url}, priority: ${priority}`);
    } catch (error) {
        console.error(`Erreur lors du préchargement : ${url}`, error);
        throw new Error(`Erreur lors du préchargement : ${url}`);
    }
}

async function preloadAndApplyBackground() {
    const elementsWithDataBg = document.querySelectorAll('[data-background]');
    for (const element of elementsWithDataBg) {
        const dataBg = element.getAttribute('data-background');
        const priority = element.getAttribute('data-preload-priority') || 1;
        if (dataBg && !cache[dataBg]) {
            try {
                await preloadImage(dataBg, priority);
                element.style.backgroundImage = `url('${dataBg}')`;
                console.log(`Préchargement et application d'arrière-plan réussis : ${dataBg}`);
            } catch (error) {
                console.error(`Erreur lors du préchargement de l'arrière-plan : ${dataBg}`, error);
            }
        }
    }
}

async function preloadAndShowImages() {
    const imgElements = document.querySelectorAll('img[data-src]');
    for (const img of imgElements) {
        const dataSrc = img.getAttribute('data-src');
        const priority = img.getAttribute('data-preload-priority') || 1;
        if (dataSrc && !cache[dataSrc]) {
            await preloadAndShowImage(dataSrc, img);
        }
    }
    await preloadAndApplyBackground();
}

async function preloadAndShowMedia() {
    const audioElements = document.querySelectorAll('audio[data-src]');
    const videoElements = document.querySelectorAll('video[data-src]');

    for (const audio of audioElements) {
        const priority = audio.getAttribute('data-preload-priority') || 1;
        const dataSrc = audio.getAttribute('data-src');
        if (dataSrc && !cache[dataSrc]) {
            await preloadAndShowMediaResource(dataSrc, audio);
        }
    }

    for (const video of videoElements) {
        const priority = video.getAttribute('data-preload-priority') || 1;
        const dataSrc = video.getAttribute('data-src');
        if (dataSrc && !cache[dataSrc]) {
            await preloadAndShowMediaResource(dataSrc, video);
        }
    }
}

setInterval(cleanCache, 60 * 60 * 1000);
setInterval(adjustCacheSize, 10 * 60 * 1000); // Adjust cache size every 10 minutes

window.ImgPreload = {
    preloadAndShowImages: preloadAndShowImages,
    preloadAndShowMedia: preloadAndShowMedia
};
