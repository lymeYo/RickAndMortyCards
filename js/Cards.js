import { LyModal } from '../../../My-plugins/LyModale-plugin/LyModal';

const modal = new LyModal(
   `<div class="test-modal" id="lyModal-content">Myself modal</div>`,
);

console.log(123);


export class Cards {
   constructor() {
      this.list = document.querySelector('#cards-list');
   }
   
   render(orderEpisodes) {
      
      orderEpisodes.forEach((episodeInfo) => {
         let { name, episode, air_date, description } = episodeInfo;
         let seria = episode.slice(4, 6);
         let season = episode.slice(1, 3);
         
         let html = `
            <li class="cards-list__item" data-seria="${seria}">
               <div class="cards-list__episode"> Сезон ${season}, Серия ${seria} </div>
               <div class="cards-list__logo">
                  <img src="https://i.guim.co.uk/img/media/b563ac5db4b4a4e1197c586bbca3edebca9173cd/0_12_3307_1985/master/3307.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=61a26bf43da26e4ca97e932e5ee113f7" alt="">
               </div>
               <div class="cards-list__title">${name}</div>
               <div class="cards-list__description">
                  <span>${description?.split(" ").slice(0, 20).join(" ") || '' + '...'}</span>
               </div>
               <div class="cards-list__button-area">
               <button class="cards-list__button">Подробнее</button>
               <div class="cards-list__air-date">Дата выхода: <br> ${air_date} </div>
               </div>
            </li>
         `;

         let id = (season[0] == '0') ? season.slice(1) : season;
         if (!document.querySelector(`[data-section="${id}"]`)) {
            let section = document.createElement('section');
            section.classList.add('section-items');
            section.innerHTML = `
               <div class='cards-list__turn-section' data-section-point="${id}">
                  ${id} - Сезон
                  <span class="material-icons section-open-icon"> expand_more </span>
               </div>
               <div class='cards-list__content-section' data-section="${id}"></div>
            `;
            this.list.insertAdjacentElement('beforeend', section);
         };
         let htmlCurrentSection = document.querySelector(`[data-section="${id}"]`);
         htmlCurrentSection.insertAdjacentHTML('beforeend', html);

         htmlCurrentSection.querySelector(`[data-seria="${seria}"]`)
            .querySelector('.cards-list__button')
            .addEventListener('click', () => { this.renderModalCard(episodeInfo) })
      });
   }

   renderModalCard(ep) {
      console.log(ep);
      
      modal.open();
   }

   //метод с функциями для обработки всех архитектурных элементов сайта
   initArchi() {
      (function initToggleSections() {
         let pointers = document.querySelectorAll(".cards-list__turn-section");
         pointers.forEach(point => {
            point.addEventListener('click', () => {
               let id = point.dataset.sectionPoint;
               let section = document.querySelector(`[data-section="${id}"]`);
               section.parentElement.classList.toggle('disable');
            })
         })
      })();


   }
}