const cache = {};
const maxCacheSize = 50; // elements limit in the cache
const cacheDuration = 30 * 60 * 1000 // Cache lifetime in milliseconds (here, 30 minutes)
const memoryThreshold = 100; // Memory threshold in Megabytes

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
                    const keys = Object.keys(cache);
                    delete cache[keys[0]];
                }
                resolve(img.src);
            };
            img.onerror = () => {
                console.error(`Erreur lors du chargement de l'image : ${url}`)
                reject(new Error(`Erreur lors du chargement de l'image : ${url}`))
            }
            img.src = url;
        }
    });
}


function cleanCache(){
    for (const key in cache){
        if (cache.hasOwnerProperty(key)){
            const currentTime = new Date().getTime();
            const resourceTime = cache[key].cachedTime;
            if (currentTime - resourceTime > cacheDuration){
                delete cache[key];
                console.log(`La ressource ${key} a été retirée du cache car elle a dépassé la durée de vie.`)
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
        if (cache[url]) {
            resolve(cache[url]);
        } else {
            mediaElement.oncanplaythrough = () => {
                cache[url] = mediaElement;
                resolve(url);
            };
            mediaElement.onerror = reject;
            mediaElement.src = url;
        }
    });
}

async function preloadAndShowImage(url, imgElement) {
    try {
        const priority = imgElement.getAttribute('data-preload-priority') || 1;
        const cachedImage = await preloadImage(url);
        if (cachedImage) {
            imgElement.src = cachedImage;
            console.log(`Préchargement et affichage réussis : ${url}`);
        }else{
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
            const cachedMedia = await preloadMedia(url, mediaElement);
            cache[url] = cachedMedia;
        }
        mediaElement.src = cache[url].src;
        console.log(`Préchargement et affichage réussis : ${url}`);
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
                await preloadImage(dataBg);
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
    preloadAndShowMedia: preloadAndShowMedia
};
