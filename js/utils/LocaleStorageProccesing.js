

class LocaleStorageProccesing {
   constructor() {}
   
   processStorageData(storageKey, item) {
      let curData = this.getStorageData(storageKey);
      
      let curDataIndexes = curData.map(item => item.id);
      let indexExistItem = curDataIndexes.indexOf(item.id);
      console.log(indexExistItem);
      
      if (indexExistItem + 1) 
         curData.splice(indexExistItem, 1);
      else
         curData.push(item);

      console.log(curData);
      curData = JSON.stringify(curData);

      localStorage.setItem(storageKey, curData);
   }

   getStorageData(storageKey) {
      
      if (localStorage.getItem(storageKey) === null) localStorage.setItem(storageKey, "[]") // если массива значений нет, создаю
      let curData = JSON.parse(localStorage.getItem(storageKey));

      return curData;
   }

}

export default new LocaleStorageProccesing();