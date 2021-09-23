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


class Vehicle {
   drive() {
      console.log("Vehicle is driving");
      this.establish()
   }

   establish() {
      console.log('Vehicle is establishing');
   }
}

class Car extends Vehicle {
   constructor() {
      super();
   }
   drive() {
      super.drive();
   }
   establish() {
      console.log("Car establish proccesing");
   }
}
let car = new Car()
car.method = () => 15;
car.method2 = () => 30;
Object.defineProperty(car, 'method', {
   value: car.method,
   enumerable: false,
})

for (let key in car) {
   console.log(key, car[key]);
   
}


(async function() {
   cards.renderLodaerList(true); 

   //перебираю всех возможных персонажей с API, в начале массива которых лежат необходимые
   let allCharacters = await processingAPI.getAllCharactersAPI([1, 2, 3, 4, 5, 77]); //[1, 2, 3, 4, 5, 125]

   await interfaceArchitecture.init(['species', 'location-name', 'status', 'gender'], allCharacters);
   
   let startCharacters = await processingAPI.getSeveralCharactersAPI(30); //вводится массив индексов, которые показывать сначала

   await cards.renderCharacters(allCharacters, startCharacters);

   //favorites.render(allCharacters); // рендер уведомлений вызываю внутри Cards renderHtmlCards

   cards.renderLodaerList(false);
})();