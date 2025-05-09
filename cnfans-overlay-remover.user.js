// ==UserScript==
// @name         CNFans – Overlay Remover v2
// @namespace    https://github.com/toto/ton-repo
// @version      2.0
// @description  Supprime automatiquement l’overlay d’avertissement sur les pages produit CNFans
// @match        https://cnfans.com/product*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  // Fonction qui va chercher et supprimer le modal
  function zapOverlay() {
    // 1) Rechercher tout élément contenant la phrase d’avertissement
    document.querySelectorAll('div').forEach(div => {
      const txt = div.textContent || '';
      if (txt.includes('CNFans warm reminder') ||
          txt.includes('Non-purchasable item') ||
          txt.includes('we suggest you read the risks')) {
        // On remonte jusqu’à l’élément en position fixed ou la boîte de dialogue parent
        let el = div;
        while (el && el.tagName.toLowerCase() !== 'body') {
          const st = getComputedStyle(el);
          if ((st.position === 'fixed' || st.position === 'absolute')
              && parseInt(st.zIndex) > 0) {
            el.remove();
            break;
          }
          el = el.parentElement;
        }
      }
    });

    // 2) Supprimer tout fond semi-transparent couvrant la page
    document.querySelectorAll('div').forEach(div => {
      const st = getComputedStyle(div);
      if ((st.backgroundColor.startsWith('rgba(0, 0, 0') || st.backgroundColor.startsWith('rgba(255, 255, 255')))
          && parseFloat(st.opacity) >= 0.5
          && (st.position === 'fixed' || st.position === 'absolute')
          && parseInt(st.width) >= window.innerWidth * 0.8
          && parseInt(st.height) >= window.innerHeight * 0.8) {
        div.remove();
      }
    });

    // 3) Réactiver le scroll si besoin
    document.body.style.overflow = '';
  }

  // Observer les ajouts dynamiques
  const obs = new MutationObserver(zapOverlay);
  obs.observe(document.documentElement, { childList: true, subtree: true });

  // Lancer au chargement et quelques fois après
  window.addEventListener('load', zapOverlay);
  setTimeout(zapOverlay, 500);
  setTimeout(zapOverlay, 2000);
  setTimeout(zapOverlay, 5000);
})();
