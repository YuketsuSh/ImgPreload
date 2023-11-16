function preloadImage(url){
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            resolve(img.src);
        };
        img.onerror = reject;
        img.src = url;
    });
}

async function preloadAndShowImage(url, imgE){
    try {
        await preloadImage(url);
        imgE.src = url;
        console.log(`Préchargement et affichage réussis : {$url}`);
    }catch (error){
        console.error(`Erreur lors du préchargement : ${url}`, error);
        throw new Error(`Erreur lors du préchargement : ${url}`);
    }
}

async function preloadAndApplyBackground() {
    const elementsWithDataBg = document.querySelectorAll('[data-background]');
    for (const element of elementsWithDataBg) {
        const dataBg = element.getAttribute('data-background');
        if (dataBg){
            try {
                await preloadImage(dataBg);
                element.style.backgroundImage = `url('${dataBg}')`;
                console.log(`Préchargement et application d'arrière-plan réussis : ${dataBg}`);
            }catch (error) {
                console.log(`Erreur lors du préchargement de l'arrière-plan : ${dataBg}`, error)
            }
        }
    }
  }
  
async function preloadAndShowImages() {
    const imgE = document.querySelectorAll('img[data-src]');
    for (const img of imgE) {
        const dataSrc = img.getAttribute('data-src');
        if (dataSrc) {
            await preloadAndShowImage(dataSrc, img);
        }
    }

    await preloadAndApplyBackground();
}

window.ImgPreload = {
    preloadAndShowImages: preloadAndShowImages
};
