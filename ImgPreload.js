const cache = {};
let maxCacheSize = 50; // elements limit in the cache
let cacheDuration = 30 * 60 * 1000 // Cache lifetime in milliseconds (here, 30 minutes)
let memoryThreshold = 100; // Memory threshold in Megabytes


class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(item, priority) {
        this.queue.push({ item, priority });
        this.queue.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.queue.shift();
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}

const priorityQueue = new PriorityQueue();

function preloadImage(url, priority = 1) {
    return new Promise((resolve, reject) => {
        if (isExternalURL(url)) {
            fetch(url)
                .then(response => response.blob())
                .then(blob => {
                    const imgUrl = URL.createObjectURL(blob);
                    const img = new Image();
                    img.onload = () => {
                        cache[url] = img;
                        console.log(`Image ${url} loaded and cached.`);
                        if (Object.keys(cache).length > maxCacheSize) {
                            const keys = Object.keys(cache);
                            delete cache[keys[0]];
                        }
                        resolve(img.src);
                    };
                    img.onerror = reject;
                    img.src = imgUrl;
                    priorityQueue.enqueue(url, priority);
                })
                .catch(error => {
                    console.error(`Error loading image from external URL: ${url}`, error);
                    reject(error);
                });
        } else {
            const img = new Image();
            img.onload = () => {
                cache[url] = img;
                console.log(`Image ${url} loaded and cached.`);
                if (Object.keys(cache).length > maxCacheSize) {
                    const keys = Object.keys(cache);
                    delete cache[keys[0]];
                }
                resolve(img.src);
            };
            img.onerror = reject;
            img.src = url;
            priorityQueue.enqueue(url, priority);
        }
    });
}


function cleanCache(){
    for (const key in cache){
        if (cache.hasOwnProperty(key)){
            const currentTime = new Date().getTime();
            const resourceTime = cache[key].cachedTime;
            if (currentTime - resourceTime > cacheDuration){
                delete cache[key];
                console.log(`Resource ${key} was removed from cache because it exceeded its lifetime.`)
            }
        }
    }
}

function adjustCacheSize(){
    const memoryInfo = window.performance.memory;
    if (memoryInfo && memoryInfo.total){
        const totalMemoryInMB = memoryInfo.total / (1024 * 1024);
        if (totalMemoryInMB < memoryThreshold && maxCacheSize > 10){
            maxCacheSize = Math.floor(maxCacheSize * 0.9);
        }else if (totalMemoryInMB > memoryThreshold && maxCacheSize < 100){
            maxCacheSize = Math.ceil(maxCacheSize * 1.1);
        }
    }
}

function preloadMedia(url, mediaElement) {
    return new Promise((resolve, reject) => {
        const priority = mediaElement.getAttribute('data-preload-priority') || 1;
        if (isExternalURL(url)) {
            fetch(url)
                .then(response => response.blob())
                .then(blob => {
                    const mediaUrl = URL.createObjectURL(blob);
                    mediaElement.oncanplaythrough = () => {
                        cache[url] = mediaElement;
                        resolve(mediaElement);
                    };
                    mediaElement.onerror = (error) => {
                        console.error(`Error loading ${url}`, error);
                        reject(error);
                    };
                    mediaElement.src = mediaUrl;
                    priorityQueue.enqueue(url, priority);
                })
                .catch(error => {
                    console.error(`Error loading media from external URL: ${url}`, error);
                    reject(error);
                });
        } else {
            if (cache[url]) {
                resolve(cache[url]);
            } else {
                mediaElement.oncanplaythrough = () => {
                    cache[url] = mediaElement;
                    resolve(mediaElement);
                };
                mediaElement.onerror = (error) => {
                    console.error(`Error loading ${url}`, error);
                    reject(error);
                };
                mediaElement.src = url;
                priorityQueue.enqueue(url, priority);
            }
        }
    });
}

function isExternalURL(url) {
    return url.startsWith('http://') || url.startsWith('https://');
}

async function preloadAndShowImage(url, imgElement) {
    try {
        const cachedImage = await preloadImage(url);
        imgElement.src = cachedImage;
        console.log(`Preloading and displaying successfully : ${url}`);
    } catch (error) {
        console.error(`Error while preloading : ${url}`, error);
        throw new Error(`Error while preloading : ${url}`);
    }
}


async function preloadAndShowMediaResource(url, mediaElement) {
    try {
        if (!cache[url]) {
            const cachedMedia = await preloadMedia(url, mediaElement);
            cache[url] = cachedMedia;
        }
        mediaElement.src = cache[url].src;
        console.log(`Preloading and displaying successfully : ${url}`);
    } catch (error) {
        console.error(`Error while preloading : ${url}`, error);
        throw new Error(`Error while preloading : ${url}`);
    }
}

async function preloadAndApplyBackground() {
    const elementsWithDataBg = document.querySelectorAll('[data-background]');
    for (const element of elementsWithDataBg) {
        const dataBg = element.getAttribute('data-background');
        if (dataBg && !cache[dataBg]) {
            try {
                await preloadImage(dataBg);
                element.style.backgroundImage = `url('${dataBg}')`;
                console.log(`Successful preloading and background application : ${dataBg}`);
            } catch (error) {
                console.error(`Error preloading background : ${dataBg}`, error);
            }
        }
    }
}

async function preloadAndShowImages() {
    const imgElements = document.querySelectorAll('img[data-src]');
    for (const img of imgElements) {
        const dataSrc = img.getAttribute('data-src');
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
        const dataSrc = audio.getAttribute('data-src');
        if (dataSrc && !cache[dataSrc]) {
            await preloadAndShowMediaResource(dataSrc, audio);
        }
    }

    for (const video of videoElements) {
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
    preloadAndShowMedia: preloadAndShowMedia,

    setPreloadMemory: function(quantity){
        memoryThreshold = quantity;
    
        const elements = document.querySelectorAll('img, audio, video');
    
        elements.forEach(element => {
            const tagName = element.tagName.toLowerCase();
            if ((tagName === 'img' || tagName === 'audio' || tagName === 'video') && !element.dataset.preloadMemory) {
                element.dataset.preloadMemory = quantity;
            }
        });
    
        console.log(`Preload memory set to ${quantity} MB for selected elements`);
    },

    setPreloadCacheSize: function(size){
        maxCacheSize = size;
        const elements = document.querySelectorAll('img, video, audio');
        elements.forEach(element => {
            const tagName = element.tagName.toLocaleLowerCase();
            if ((tagName === 'img' || tagName === 'audio' || tagName === 'video') && !element.dataset.preloadCacheSize) {
                element.dataset.preloadCacheSize = size;
            } 
        });
        console.log(`Preload cache size set to ${size} for selected elements`);
    },

    setCacheDuration: function(durationInMilliseconds){
        cacheDuration = durationInMilliseconds;
        
        const elements = document.querySelectorAll('img, audio, video');
        
        elements.forEach(element => {
            const tagName = element.tagName.toLowerCase();
            if ((tagName === 'img' || tagName === 'audio' || tagName === 'video') && !element.dataset.cacheDuration) {
                element.dataset.cacheDuration = durationInMilliseconds;
            }
        });
        
        console.log(`Cache duration set to ${durationInMilliseconds} ms for selected elements`);
    }
    
};
