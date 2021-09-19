'use strict';

import 'regenerator-runtime/runtime';
import axios from 'axios'; //подключил библиотеку на случай работы с ссылочным API (сейчас методы api сразу возвращают промисы)

import { ProcessingAPI } from './utils/ProcessingAPI'; // класс, который занимается обработкой API
import { Cards } from './Cards';
import interfaceArchitecture from './utils/interfaceArchitecture.js';


// const modal = new LyModal;
// modal.open();

const processingAPI = new ProcessingAPI();

const cards = new Cards();

// document.querySelectorAll('.cards__filter-list').classList.add('active');
// console.log(document.querySelectorAll('.cards__filter-list'));

(async function() {
   cards.renderLodaerList(true);

   await interfaceArchitecture.render(['species', 'location-name', 'status', 'gender']);
   
   let allCharacters = await processingAPI.getAllCharactersAPI([1, 2, 3, 4, 5, 77]); //[1, 2, 3, 4, 5, 125]
   
   let someCharcters = await processingAPI.getSeveralCharactersAPI(30); //вводится массив индексов, которые показывать сначала

   await cards.renderCharacters(allCharacters, someCharcters);

   cards.renderLodaerList(false);
}());