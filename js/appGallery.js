'use strict';

import 'regenerator-runtime/runtime';
import gallery from './Gallery.js';
import slickSlider from './utils/gallerySlickSlider.js';

// document.querySelector('.gallery-wrapper').insertAdjacentHTML('beforeend', '<img src="./imgs/gallery-images/gallery-img-0.png" alt="">')
(async function render() {
   await gallery.render();
   slickSlider.render();
   gallery.renderOpenImages();
   console.log(document.querySelectorAll('.gallery'));
})()
