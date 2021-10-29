// ***************************************************************************************
// 2. Заполнение карточек от JS

const initialCards = [
  {
    name: 'Марс',
    link: 'https:///malkov-os.ru/yand_pr/pictures/photo-Mars1634876371692-681495dbe82d.jpg'
  },
  {
    name: 'Домбай',
    link: 'https:///malkov-os.ru/yand_pr/pictures/photo-Dombuy1599821020079-515af554d944.jpg'
  },
  {
    name: 'Карелия',
    link: 'https:///malkov-os.ru/yand_pr/pictures/photo-Kerel1548288242-d454d4648b55.jpg'
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

initialCards.forEach( item => {
  addCard(item.name, item.link);
})
