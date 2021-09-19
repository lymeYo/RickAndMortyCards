import { LyModal } from '../../../My-plugins/LyModale-plugin/LyModal';
import { getCharacters } from 'rickmortyapi';
import { getCharacter } from 'rickmortyapi';
import { getEpisodes } from 'rickmortyapi';

let newModal = new LyModal(`<div class="character-modal" id="lyModal-content"></div>`);

export class Cards {
   constructor() {
      this.list = document.querySelector('#cards-list');
   }
   
   async renderCharacters(allCharacters, someCharacters) { 
      if (!this.totalCharcters) 
         this.totalCharcters = allCharacters;

      if (!this.filterOptions)
         this.filterOptions = {};

      this.renderHtmlCards(someCharacters);

      this.initSearchArea()

      this.filterArguments = document.querySelectorAll('.choisable-item');

      this.filterArguments.forEach(argument => {
         argument.addEventListener('click', this.preRenderArgumentsForSeedingCards.bind(this, argument))
      })

      this.renderLodaerList(false);
   }

   initSearchArea() {
      let searchInput = document.querySelector('#search-input');
      let searchBtn = document.querySelector('#search-button');
      searchBtn.addEventListener('click', () => this.renderSearchFiltering.call(this, searchInput.value));
      window.addEventListener('keydown', (event) => {
         if (event.key == 'Enter' && searchInput.value)
            this.renderSearchFiltering(searchInput.value);
      })
   }
   
   renderHtmlCards(orderCharacters) {
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
         currentButton.addEventListener('click', () => this.cardModalRender(data));
      });

      this.renderLodaerList(false);
   }
   
   // фильтрация всех данных, которая получает на вход html элемент с соответствующими дата элементами
   preRenderArgumentsForSeedingCards(argument) {
      let filterKey = argument.parentNode.dataset.filterType; // беру указанные данные в датасете по объектам API для фильтрации
      let filterValue = argument.dataset.value;

      this.renderSeedingCards(filterKey, filterValue)
   }
   
   renderSeedingCards(filterKey, filterValue) {
      console.log(filterKey, filterValue);
      
      this.renderLodaerList(true);

      this.setFilterParametrs(filterKey, filterValue);

      
      let filteringCharacters = this.totalCharcters.filter(character => {
         
         for (let filterKey in this.filterOptions) {

            let { valueInKeyPath, currentCharacter } = this._parsingKeyPath(filterKey, character); // прохожу по цепочке вложенных объектов до нужного свойства
            let charcterValue = currentCharacter[valueInKeyPath];
            let filterValue = this.filterOptions[filterKey];

            if (filterValue != 'all' && !charcterValue.toLowerCase().includes(filterValue.toLowerCase()) && filterValue != '') return false;
         }

         return true;
      });

      
      this.list.innerHTML = "";
      this.renderHtmlCards(filteringCharacters);
   }

   setFilterParametrs(filterKey, filterValue) {
      this.filterOptions[filterKey] = filterValue;
   }

   _parsingKeyPath(filterKey, currentCharacter) {
      
      let keyPath = filterKey.split('-').reverse(); // прохожусь по указанному пути до исходного ключа, если это объекты (obj-obj-key)
      let valueInKeyPath = keyPath.slice(-1)[0];
      
      keyPath = keyPath.slice(0, -1) // разбиваю путь на объекты и финальное значение (valueInKeyPath)

      if (keyPath.length)
         for (let pathStep of keyPath)
            currentCharacter = currentCharacter[pathStep];

      return { valueInKeyPath, currentCharacter };
   }

   renderLodaerList(renderLoader) {
      const list = document.querySelector('#cards-list');
      const loaderArea = document.querySelector('.cards__loader');

      if (renderLoader) {
         list.classList.add('disable');
         loaderArea.classList.add('active');
      }
      else {
         list.classList.remove('disable');
         loaderArea.classList.remove('active');
      }
   }

   renderSearchFiltering(inputValue) {
      let filterKey = 'name';
      let filterValue = inputValue;

      this.renderSeedingCards(filterKey, filterValue)
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
      let modalContent = `
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
         `;
      newModal.setContent(modalContent);
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
}