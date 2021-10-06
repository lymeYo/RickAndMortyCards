'use strict';

import axios from 'axios';
// import axios from '../galleryJsonImages.json';
console.log(axios);

class Gallery {
   constructor() {
      this.eductionFromImgsToJson();
   }

   eductionFromImgsToJson() {
      
   }
   //galleryJsonImages
   async render() {
      this.galleriesWrapper = document.querySelector('.gallery-wrapper');
      this.galleryFilesPaths = await this.setJsonImages();
      console.log(this.galleryFilesPaths);
      this.galleryFilesPaths = this.galleryFilesPaths.map((paths, row) => paths.map(src => `./gallery-images/row-${row + 1}/${src}`));
      // console.log(this.galleryFilesPaths);
      
      // 
      console.log(this.gallerySrcImgsCollections);
      this.renderHtmlGallery();
      // this.renderNewListeners();
   }


   async setJsonImages() {
      //работает только такой путь, тк картинки скорее всего парсятся с json который в dist
      let images = await axios('/galleryJsonImages.json');
      
      return images.data;
   }

   renderHtmlGallery() {
      this.galleryFilesPaths.forEach((pathsCollection, row) => {
         let htmlItems = ``;
         pathsCollection.forEach((path, col) => {
            htmlItems += `<div class="gallery__item"><img data-order-row-col="${row} ${col}" src="${path}"></div>`;
         })
         let galleryHtml = 
         `<div class="gallery">
            ${htmlItems}
         </div>`;

         this.galleriesWrapper.insertAdjacentHTML('beforeend', galleryHtml);
      });
   }

   // сырая реализация модалок галереи без выносения в собственный класс
   renderOpenImages() {
      const modal = document.querySelector('#gallery-modal');
      const modalPrev = document.querySelector('.gallery-modal__prev');
      const modalNext = document.querySelector('.gallery-modal__next');
      let modalImg = document.querySelector('.gallery-modal__img');
      if (!modalImg) {
         modalImg = document.createElement('img');
         modal.querySelector('.gallery-modal__content').insertAdjacentElement('beforeend', modalImg);
      }
      const allSlickTracks = document.querySelectorAll('.slick-track');
      
      const setAttributes = (row, col) => {
         modalImg.src = this.galleryFilesPaths[row][col];
         modalImg.dataset.orderRowCol = `${row} ${col}`;
         console.log(modalImg);
      }
      
      // this.setBlocksImgsListeners = this.setBlocksImgsListeners.bind(this, modal, blocksImgs, modalImg);
      // this.setBlocksImgsListeners();


      modal.addEventListener('click', (event) => {
         if (event.target !== modal) return 

         modal.classList.remove('active')
      });

      allSlickTracks.forEach(slickTrack => slickTrack.addEventListener('click', (event) => {
         let block = (event.target.classList.contains('gallery__item')) ? event.target : event.target.closest('.gallery__item');
         
         if (!block) return;
         console.log(block);

         // let current src = ()
         modal.classList.add('active');
         
         modalImg.src = block.querySelector('img').src;
         modalImg.dataset.orderRowCol = block.querySelector('img').dataset.orderRowCol;
         console.log(modalImg);
      }))

      modalNext.addEventListener('click', () => {
         let [row, col] = modalImg.dataset.orderRowCol.split(' ');
         col = +col + 1;
         col = (col >= this.galleryFilesPaths[row].length) ? 0 : col;
         setAttributes(row, col);
      })
      
      modalPrev.addEventListener('click', () => {
         let [row, col] = modalImg.dataset.orderRowCol.split(' ');
         col = +col - 1;
         col = (col < 0) ? this.galleryFilesPaths[row].length - 1 : col;
         
         setAttributes(row, col);
      })
   }

}

export default new Gallery();