'use strict';
import 'regenerator-runtime/runtime';
import axios from 'axios'; //подключил библиотеку на случай работы с ссылочным API (сейчас методы api сразу возвращают промисы)

import { ProcessingAPI } from './utils/ProcessingAPI'; // класс, который занимается обработкой API
import { Cards } from './Cards';


// const modal = new LyModal;
// modal.open();

const processingAPI = new ProcessingAPI();

const cards = new Cards();



(async function() {
   let responce = await processingAPI.getAPI();
   cards.render(responce);
   cards.initArchi();
   let character = await axios.get('https://rickandmortyapi.com/api/character/1');
   console.log(character);
}());