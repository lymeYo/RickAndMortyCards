import { getCharacters } from 'rickmortyapi';
import { getCharacter } from 'rickmortyapi';
import HoverTooltip from '../../../../My-plugins/HoverTooltip-plugin/HoverTooltip.js';


class interfaceArchitecture {
   constructor() {}
   
   async init(parameters, allCharacters) {

      await this.setCategoriesFiltering(parameters, allCharacters)

      this.startPageParameters();

      this.renderHeaderParameters()
   }

   finallyRender() {
      this.setHoverContent();
   }

   async setCategoriesFiltering(parametrs, allCharacters) {
      if (!parametrs) return;
      
      const filterArea = document.querySelector('.cards__filter-themes');
      // let characters = (await getCharacters()).data.results;


      let listParametrs = {};

      allCharacters.forEach(character => {
         //Прорисовываю алгоритмом все категории для фильтров
         for (let [key, value] of Object.entries(character)) {


            let checkPath = parametrs.find(par => par.split('-')[1] && par.split('-')[0] == key);
            if (checkPath) { //обход вложенного массива необходимых параметров с апишки(таких как obj.obj.value)

               let pathParameter = checkPath.split('-');
               let totalParameter = character;
               key = "";
               for (let pathKey in pathParameter) {
                  key = pathParameter[pathKey] + '-' + key;
                  totalParameter = totalParameter[pathParameter[pathKey]];
               }
               key = key.slice(0, -1);

               value = totalParameter;
            }


            if (checkPath || parametrs.includes(key)) {
               (!listParametrs[key]) ? listParametrs[key] = new Set() : 0;
               listParametrs[key].add(value);
            }
         }
      })

      //Прорисовываю все списки с категориями для фильтрации
      for (let key in listParametrs) {
         let innerList = `<li class="cards__filter-item choisable-item" data-value="all">All</li>`;

         listParametrs[key].forEach(value => {
            if (value == 'unknown') return;

            innerList += `<li class="cards__filter-item choisable-item" data-value="${value}">${value}</li>`;
         })


         let wrapper = `
                  <div class="cards__filter-content">
                     <div class="cards__filter-item filter__item_${key}" id="key-list-area" data-list-key="filter-${key}-key">
                        <span class="cards__filter-item-title"> ${key[0].toUpperCase() + key.slice(1)} </span>
                        <span class="material-icons"> chevron_left </span>
                     </div>
                     <ul class="cards__filter-list" data-filter-type="${key}">
                        ${innerList}
                     </ul>
                  </div>
               `;
         filterArea.insertAdjacentHTML('beforeend', wrapper);
      }

      let keyWords = document.querySelectorAll('.cards__filter-content');

      keyWords.forEach(key => key.addEventListener('click', this.renderOpenList.bind(this, key)));

      //отрисовка, функционал списка
      this.initStartWidthListItems();
      this.initClosableList();
      window.addEventListener('resize', () => {
         console.log(document.body.offsetWidth);
         
         if (document.body.offsetWidth < 801) {
            let filterArea = document.querySelector('.cards__filter');
            filterArea.style.fontSize = '15px';
            this.initStartWidthListItems()
         }
         if (document.body.offsetWidth < 650) {
            let filterArea = document.querySelector('.cards__filter');
            filterArea.style.fontSize = '12px';
            this.initStartWidthListItems()
         }
      });
   }

   initStartWidthListItems() {
      let toitalList = document.querySelectorAll('.cards__filter-content');
      toitalList.forEach(item => {
         let list = item.querySelector('.cards__filter-list');
         list.style.display = 'block';
         item.querySelector('.cards__filter-item-title').style.width = list.offsetWidth + 'px';
         list.style.display = '';
      })
   }

   initClosableList() {
      const allListFields = document.querySelectorAll('.choisable-item');

      allListFields.forEach(item => {
         item.addEventListener('click', () => {
            item.closest('.cards__filter-content').querySelector('.cards__filter-item-title').textContent = item.textContent;
            
            this.renderOpenList(item.closest('.cards__filter-content').querySelector('#key-list-area'));
         })
      })
   }

   setHoverContent() {
      const detailButtons = document.querySelectorAll('.detail-button');
      detailButtons.forEach(btn => {
         let hoverTooltip = new HoverTooltip({
            elem: btn,
            tooltip: {
               type: 'create',
               tooltipClass: 'caregory-tooltip',
               text: 'Описание',
            },
            position: 'bottom',
            smooth: false,
         })
      })
   }

   renderOpenList(key) {
      key.classList.toggle('active');
   }

   startPageParameters() {
      window.scrollTop = 0;

      document.querySelector('.anchor-content').addEventListener('click', () => window.scrollBy({
         top: -window.scrollY,
         behavior: 'smooth'
      }))
   }
   
   renderHeaderParameters() {
      const headerWrapper = document.querySelector('.header-wrapper');
      const anchor = document.querySelector('.anchor-content')
      let lastScroll = window.scrollY;

      window.addEventListener('scroll', (event) => {
         let typeHandlerHeaderWrapper = (lastScroll < window.scrollY) ? 'remove' : 'add';
         lastScroll = window.scrollY;
         headerWrapper.classList[typeHandlerHeaderWrapper]('active');
         
         console.log(window.scrollY);
         
         let typeHandlerAnchor = (window.scrollY < 500) ? 'remove' : 'add';
         anchor.classList[typeHandlerAnchor]('active');
      })
   }
}

export default new interfaceArchitecture();