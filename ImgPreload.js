const cache = {};
const maxCacheSize = 50; // elements limit in the cache
const cacheDuration = 30 * 60 * 1000 // Cache lifetime in milliseconds (here, 30 minutes)

function preloadImage(url) {
    return new Promise((resolve, reject) => {
        if (cache[url]) {
            console.log(`L'image ${url} est déjà dans le cache.`);
            resolve(cache[url].src);
        } else {
            const img = new Image();
            img.onload = () => {
                cache[url] = img;
                console.log(`Image ${url} chargée et mise en cache.`);
                if (Object.keys(cache).length > maxCacheSize){
                    const keys = Object.keys(cache);
                    delete cache[keys[0]];
                }
                resolve(img.src);
            };
            img.onerror = reject;
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
        const cachedImage = await preloadImage(url);
        imgElement.src = cachedImage;
        console.log(`Préchargement et affichage réussis : ${url}`);
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
window.ImgPreload = {
    preloadAndShowImages: preloadAndShowImages,
    preloadAndShowMedia: preloadAndShowMedia
};
