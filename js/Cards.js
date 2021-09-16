import { LyModal } from '../../../My-plugins/LyModale-plugin/LyModal';
import { getCharacters } from 'rickmortyapi';
import { getEpisodes } from 'rickmortyapi';

let newModal = new LyModal(`<div class="character-modal" id="lyModal-content"></div>`);
// setTimeout(() => newModal.open(), 2000)

export class Cards {
   constructor() {
      this.list = document.querySelector('#cards-list');
   }
   
   renderCharacters(orderCharacters) {
      console.log(orderCharacters);
      
      

      orderCharacters.forEach((data) => {
         let { name, image, id } = data;
         let html = `
            <li class="cards-list__item character-item">
               <div class="cards-list__logo">
                  <img src="${image}" alt="">
               </div>
               <div class="cards-list__title">${name}</div>
               <div class="cards-list__button-area">
               <button class="cards-list__button">Подробнее</button>
               </div>
            </li>
         `;

         this.list.insertAdjacentHTML('beforeend', html);

         let currentButton = document.querySelectorAll('.cards-list__button')[document.querySelectorAll('.cards-list__button').length - 1];
         currentButton.addEventListener('click', () => this.cardModalRender(data))
      });
   }
   // created: "2017-11-04T18:48:46.250Z"
   // episode: (41)['https://rickandmortyapi.com/api/episode/1', 'https://rickandmortyapi.com/api/episode/2', 'https://rickandmortyapi.com/api/episode/3', 'https://rickandmortyapi.com/api/episode/4', 'https://rickandmortyapi.com/api/episode/5', 'https://rickandmortyapi.com/api/episode/6', 'https://rickandmortyapi.com/api/episode/7', 'https://rickandmortyapi.com/api/episode/8', 'https://rickandmortyapi.com/api/episode/9', 'https://rickandmortyapi.com/api/episode/10', 'https://rickandmortyapi.com/api/episode/11', 'https://rickandmortyapi.com/api/episode/12', 'https://rickandmortyapi.com/api/episode/13', 'https://rickandmortyapi.com/api/episode/14', 'https://rickandmortyapi.com/api/episode/15', 'https://rickandmortyapi.com/api/episode/16', 'https://rickandmortyapi.com/api/episode/17', 'https://rickandmortyapi.com/api/episode/18', 'https://rickandmortyapi.com/api/episode/19', 'https://rickandmortyapi.com/api/episode/20', 'https://rickandmortyapi.com/api/episode/21', 'https://rickandmortyapi.com/api/episode/22', 'https://rickandmortyapi.com/api/episode/23', 'https://rickandmortyapi.com/api/episode/24', 'https://rickandmortyapi.com/api/episode/25', 'https://rickandmortyapi.com/api/episode/26', 'https://rickandmortyapi.com/api/episode/27', 'https://rickandmortyapi.com/api/episode/28', 'https://rickandmortyapi.com/api/episode/29', 'https://rickandmortyapi.com/api/episode/30', 'https://rickandmortyapi.com/api/episode/31', 'https://rickandmortyapi.com/api/episode/32', 'https://rickandmortyapi.com/api/episode/33', 'https://rickandmortyapi.com/api/episode/34', 'https://rickandmortyapi.com/api/episode/35', 'https://rickandmortyapi.com/api/episode/36', 'https://rickandmortyapi.com/api/episode/37', 'https://rickandmortyapi.com/api/episode/38', 'https://rickandmortyapi.com/api/episode/39', 'https://rickandmortyapi.com/api/episode/40', 'https://rickandmortyapi.com/api/episode/41']
   // gender: "Male"
   // id: 1
   // image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
   // location: { name: 'Earth (Replacement Dimension)', url: 'https://rickandmortyapi.com/api/location/20' }
   // name: "Rick Sanchez"
   // origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' }
   // species: "Human"
   // status: "Alive"
   // type: ""


   setModalCardContent({ id, status, name, image, species, location, origin, gender }) {
      let modalContent = 
      `<div class="character-modal" id="lyModal-content">
         <div class="character-modal__image-area">
            <div class="character-modal__image-area-name">${name}</div>
            <div class="character-modal__image-area-img">
               <img src="${image}" alt="">
            </div>
         </div>
         <div class="character-modal__content">
            <div class="character-modal__info-item">Status: ${status}</div>
            <div class="character-modal__info-item">Species: ${species}</div>
            <div class="character-modal__info-item">Location: ${location.name}</div>
            <div class="character-modal__info-item">Gender: ${gender}</div>
         </div>
      </div>`;
      newModal.setContent(`<div class="character-modal__image-area">
            <div class="character-modal__image-area-name">${name}</div>
            <div class="character-modal__image-area-img">
               <img src="${image}" alt="">
            </div>
         </div>
         <div class="character-modal__content">
            <div class="character-modal__info-item">Status: ${status}</div>
            <div class="character-modal__info-item">Species: ${species}</div>
            <div class="character-modal__info-item">Location: ${location.name}</div>
            <div class="character-modal__info-item">Gender: ${gender}</div>
         </div>`);
   }
   
   cardModalRender(id) {
      this.setModalCardContent(id);
      newModal.open();
   }
   
   renderEpisodes(orderEpisodes) {
      
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
      
      // modal.open(); 
      // TODO модалка переделана 
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