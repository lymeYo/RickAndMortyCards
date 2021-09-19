import { getCharacters } from 'rickmortyapi';
import { getCharacter } from 'rickmortyapi';

class interfaceArchitecture {
   constructor() {}
   
   async render(parameters) {
      await this.setCategoriesFiltering(parameters)

      this.startPageParameters()
   }

   async setCategoriesFiltering(parametrs) {
      //Прорисовываю алгоритмом все необходимые данный с апи
      const filterArea = document.querySelector('.cards__filter-themes');
      // let characters = (await getCharacters()).data.results;

      let characters = [];
      for (let i = 1; i < 100; i++) {
         let c = (await getCharacter(i)).data;
         characters.push(c);

      }


      let listParametrs = {};
      characters.forEach(character => {
         for (let [key, value] of Object.entries(character)) {


            let checkPath = parametrs.find(par => par.split('-')[1] && par.split('-')[0] == key);
            if (checkPath) { //обход вложенного массива необходимых параметров с апишки

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

   renderOpenList(key) {
      key.classList.toggle('active');
   }

   startPageParameters() {
      window.scrollTop = 0;
   }
}

export default new interfaceArchitecture();