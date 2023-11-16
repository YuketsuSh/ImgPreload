function preloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            resolve(img.src);
        };
        img.onerror = reject;
        img.src = url;
    });
}

function preloadMedia(url, mediaElement) {
    return new Promise((resolve, reject) => {
        mediaElement.oncanplaythrough = () => {
            resolve(url);
        };
        mediaElement.onerror = reject;
        mediaElement.src = url;
    });
}

async function preloadAndShowImage(url, imgElement) {
    try {
        await preloadImage(url);
        imgElement.src = url;
        console.log(`Préchargement et affichage réussis : ${url}`);
    } catch (error) {
        console.error(`Erreur lors du préchargement : ${url}`, error);
        throw new Error(`Erreur lors du préchargement : ${url}`);
    }
}

async function preloadAndShowMediaResource(url, mediaElement) {
    try {
        await preloadMedia(url, mediaElement);
        mediaElement.src = url;
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
        if (dataBg) {
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
        if (dataSrc) {
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
        if (dataSrc) {
            await preloadAndShowMediaResource(dataSrc, audio);
        }
    }

    for (const video of videoElements) {
        const dataSrc = video.getAttribute('data-src');
        if (dataSrc) {
            await preloadAndShowMediaResource(dataSrc, video);
        }
    }
}

window.ImgPreload = {
    preloadAndShowImages: preloadAndShowImages,
    preloadAndShowMedia: preloadAndShowMedia
};
