'use strict';

import 'regenerator-runtime/runtime';
import axios from 'axios'; //подключил библиотеку на случай работы с ссылочным API (сейчас методы api сразу возвращают промисы)

import { ProcessingAPI } from './utils/ProcessingAPI'; // класс, который занимается обработкой API
import { Cards } from './Cards';
import interfaceArchitecture from './utils/interfaceArchitecture.js';
import favorites from './Favorites.js';
import localeStorageProccesing from './utils/LocaleStorageProccesing.js';

const processingAPI = new ProcessingAPI();

const cards = new Cards();

(async function render() {
   cards.renderLodaerList(true); 

   //перебираю всех возможных персонажей с API, в начале массива которых лежат необходимые
   let allCharacters = await processingAPI.getAllCharactersAPI([1, 2, 3, 4, 5, 77]); //[1, 2, 3, 4, 5, 125]

   await interfaceArchitecture.init(['species', 'location-name', 'status', 'gender'], allCharacters);
   
   let startCharacters = await processingAPI.getSeveralCharactersAPI(30); //вводится массив индексов, которые показывать сначала

   await cards.renderCharacters(allCharacters, startCharacters);

   interfaceArchitecture.finallyRender();
   //favorites.render(allCharacters); // рендер уведомлений вызываю внутри Cards renderHtmlCards

   cards.renderLodaerList(false);
})();