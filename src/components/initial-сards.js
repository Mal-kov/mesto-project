// ***************************************************************************************
// Заготовка начальных карточек

export const initialCards = [
  {
    name: 'Чайка',
    link: 'https://malkov-os.ru/yand_pr/pictures/pexels-kira-schwarz-11031074.jpg'
  },
  {
    name: 'Объектив',
    link: 'https://malkov-os.ru/yand_pr/pictures/pexels-jenny-uhling-10747551.jpg'
  },
  {
    name: 'Китай',
    link: 'https://malkov-os.ru/yand_pr/pictures/pexels-eva-elijas-5761962.jpg'
  },
  {
    name: 'Египет',
    link: 'https://malkov-os.ru/yand_pr/pictures/pexels-thais-cordeiro-3873663.jpg'
  },
  {
    name: 'Лувр',
    link: 'https://malkov-os.ru/yand_pr/pictures/pexels-lina-kivaka-3989820.jpg'
  },
  {
    name: 'Вегас',
    link: 'https://malkov-os.ru/yand_pr/pictures/pexels-enric-cruz-lópez-6039244.jpg'
  },
  {
    name: 'Мюнхен',
    link: 'https://malkov-os.ru/yand_pr/pictures/pexels-felix-mittermeier-532580.jpg'
  },
  {
    name: 'Япония',
    link: 'https://malkov-os.ru/yand_pr/pictures/pexels-komank-suardana-3067621.jpg'
  },
  {
    name: 'Париж',
    link: 'https://malkov-os.ru/yand_pr/pictures/pexels-boris-ulzibat-1981526.jpg'
  },
  {
    name: 'Марс',
    link: 'https://malkov-os.ru/yand_pr/pictures/photo-Mars1634876371692-681495dbe82d.jpg'
  },
  {
    name: 'Домбай',
    link: 'https://malkov-os.ru/yand_pr/pictures/photo-Dombuy1599821020079-515af554d944.jpg'
  },
  {
    name: 'Карелия',
    link: 'https://malkov-os.ru/yand_pr/pictures/photo-Kerel1548288242-d454d4648b55.jpg'
  },
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];





(cardElement, cardId) => { // 3 параметр (функция)
  const handleRemoveCardSubmit = (evt) => {
    // промис обращения к серверу на удаление карточки
    // и в случае успеха удаление её из разметки
    // закрытие модального окна
    // и удаление ненужного листенера
    removeCardModalWindow.removeEventListener('submit', handleRemoveCardSubmit);
  };

  removeCardModalWindow.addEventListener('submit', handleRemoveCardSubmit);
  openModalWindow(removeCardModalWindow);
}



//Попробую расписать, что нужно сделать внутри неё:

(cardElement, cardId) => { // эта функция-третий аргумент будет вызываться при клике на крестик
  const handleRemoveCardSubmit = (evt) => { // внутри создаём вложенную функцию-обработчик
    evt.preventDefault();

    removeCard(cardId) // отправляемся на сервер за подтверждением удаления
      .then(() => {
        handleDeleteCard(cardElement); // удаление карточки из размтетки должно происходить только в случае успешного запроса
        closeModalWindow(removeCardModalWindow);  // закрытие модальных окон должно происходить только в случае успешного запроса
      })
      .catch(err => console.log(`При удалении карточки: ${err}`));

    // а также внутри этого самого обработчика выполняем удаление его самого же
    // !!! вот это важный и нужный момент
    removeCardModalWindow.removeEventListener('submit', handleRemoveCardSubmit);
  };
  // устанавливаем этот обработчик
  removeCardModalWindow.addEventListener('submit', handleRemoveCardSubmit);
  openModalWindow(removeCardModalWindow); // и открываем модалку
}




// const deleteCard = (path) => {
//   const deleteButton = path.closest( '.elements__item' );
//   deleteButton.remove();
// }



// Получится, если сделать примерно так
// index.js
const createCard = (cardData, container) => {
  const htmlCardElem = getCardElement(
  { // 1 параметр
    ...cardData,
    currentUserId: userId,
  },
  (cardElement, cardId, isLiked) => { // 2 параметр (функция)
    // здесь промис обращения к серверу на простановку лайка
    // и в случае успеха простановка лайка в разметке
  },
  (cardElement, cardId) => { // 3 параметр (функция)
    const handleRemoveCardSubmit = (evt) => {
      // промис обращения к серверу на удаление карточки
      // и в случае успеха удаление её из разметки
      // закрытие модального окна
      // и удаление ненужного листенера
      removeCardModalWindow.removeEventListener('submit', handleRemoveCardSubmit);
    };

    removeCardModalWindow.addEventListener('submit', handleRemoveCardSubmit);
    openModalWindow(removeCardModalWindow);
  }
);

container.prepend(htmlCardElem);
};

// card.js
export const getCardElement = (data, handleLikeClick, handleDeleteClick) => {
const cardElement = getFromTemplate();
// создание HTML-карточки в памяти и навешивание листенеров
return cardElement;
};
