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

function preloadAndShowImage(url, imgE){
    return new Promise((resolve, reject) => {
        preloadImage(url)
        .then(() => {
            imgE.src = url;
            resolve();
        })
        .catch((error) => {
            reject(error);
        });
    });
}

function preloadAndApplyBackground() {
    const elementsWithDataBg = document.querySelectorAll('[data-background]');
    elementsWithDataBg.forEach(element => {
      const dataBg = element.getAttribute('data-background');
      if (dataBg) {
        preloadImage(dataBg)
          .then(() => {
            element.style.backgroundImage = `url('${dataBg}')`;
            console.log(`Préchargement et application d'arrière-plan réussis : ${dataBg}`);
          })
          .catch((error) => {
            console.error(`Erreur lors du préchargement de l'arrière-plan : ${dataBg}`, error);
          });
      }
    });
  }
  
  function preloadAndShowImages() {
    const imgE = document.querySelectorAll('img[data-src]');
    imgE.forEach(img => {
      const dataSrc = img.getAttribute('data-src');
      if (dataSrc) {
        preloadAndShowImage(dataSrc, img)
          .then(() => {
            console.log(`Préchargement et affichage réussis : ${dataSrc}`);
          })
          .catch((error) => {
            console.error(`Erreur lors du préchargement : ${dataSrc}`, error);
          });
      }
    });
  
    preloadAndApplyBackground();
  }

  window.ImgPreload = {
    preloadAndShowImages: preloadAndShowImages
  };
  