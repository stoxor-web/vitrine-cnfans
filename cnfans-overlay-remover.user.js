// ==UserScript==
// @name         CNFans – Auto-remove Overlay
// @namespace    https://github.com/NicolaeNMV/BehindTheOverlay
// @version      1.0
// @description  Supprime l’overlay d’avertissement sur les pages produit CNFans
// @match        https://cnfans.com/product*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  function removeOverlay() {
    document.querySelectorAll('body *').forEach(el => {
      const st = getComputedStyle(el);
      if(
        (st.position==='fixed'||st.position==='absolute')
        && parseInt(st.zIndex)>500
        && parseInt(st.width)>=innerWidth
        && parseInt(st.height)>=innerHeight
      ) el.remove();
    });
    document.body.style.overflow = '';
  }

  const obs = new MutationObserver(removeOverlay);
  obs.observe(document.documentElement, { childList:true, subtree:true });

  window.addEventListener('load', removeOverlay);
  setTimeout(removeOverlay,1000);
  setTimeout(removeOverlay,3000);
})();
