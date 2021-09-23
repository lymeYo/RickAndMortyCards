import localeStorageProccesing from './utils/LocaleStorageProccesing';

class Favorites {
   constructor() {
      this.notifStatus = true;
      this.allCharacters = null;
   }

   render(allCharacters) {
      const favoritesArea = document.querySelectorAll('.cards-list__favorites');

      if (!this.allCharacters) this.allCharacters = allCharacters;

      favoritesArea.forEach(area => area.addEventListener('click', () => {
         let activeIcon = area.querySelector('.icon-active');

         area.querySelector('.icon-default').classList.toggle('active');
         activeIcon.classList.toggle('active');

         if (activeIcon.classList.contains('active')) {
            this.renderFavoriteNotif(activeIcon);
         }

         this.processFavoriteContent(activeIcon);
      }));
   }

   renderFavoriteNotif(activeIcon) {
      if (!this.notifStatus) return;

      let currentName = activeIcon.closest('.cards-list__item').querySelector('.cards-list__title').dataset.name;

      const notifArea = document.querySelector('.favorites__notif');
      if (notifArea.classList.contains('active')) {
         this.notifStack(notifArea, this.renderFavoriteNotif.bind(this, activeIcon));

         return;
      }

      let notifText = `Персонаж ${currentName} добавлен в избранное`;

      notifArea.querySelector('#notif-text').textContent = notifText;
      notifArea.classList.add('active');

      let stackFn = () => {
         const delayVisibleNotif = 1000;

         setTimeout(() => notifArea.classList.remove('active'), delayVisibleNotif)
      }

      document.querySelector('.favorites__notif-btn').addEventListener('click', () => notifArea.classList.remove('active'))

      this.notifStack(notifArea, stackFn);
   }

   notifStack(notifArea, stackFn) {
      //обработка функции stackFn по окончанию транзишиона notifArea, для очереди уведомлений
      let listener = () => {
         notifArea.removeEventListener('transitionend', listener);
         stackFn();
      };

      notifArea.addEventListener('transitionend', listener);
   }

   getApiItemFromIcon(activeIcon) {
      let listItem = activeIcon.closest('.cards-list__item');
      
      let characterAPI = this.allCharacters.find(character => character.id == listItem.dataset.idCharacter);
      
      return characterAPI;
   }

   processFavoriteContent(activeIcon) {
      let character = this.getApiItemFromIcon(activeIcon);
      
      localeStorageProccesing.processStorageData("favorite", character);
   }
}

export default new Favorites();