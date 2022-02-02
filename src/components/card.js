// ***************************************************************************************
// Создание / удаление карточек


import {openPopup, closePopup} from './modal';
import {popupPlace, popupImage, fieldBigImage, fieldImgTitle} from '../pages/index'
import {disabledSubmitBtn} from './utils';

const cardContainer = document.querySelector('.elements__list');
const placeName = document.querySelector('#popup-place-name');
const plaseLink = document.querySelector('#popup-place-link');

const popupImageRender = (placeName, plaseLink) => {
  openPopup(popupImage);

  fieldBigImage.setAttribute('src', plaseLink);
  fieldBigImage.setAttribute('alt', placeName);
  fieldImgTitle.textContent = placeName;
}

export const handleCardFormSubmit = (evt) => {
  evt.preventDefault();

  addCard(placeName.value, plaseLink.value);

  placeName.value = '';
  plaseLink.value = '';

  closePopup(popupPlace);
  disabledSubmitBtn();
}

export const addCard = (placeName, plaseLink) => {
  const newCard = createCard(placeName, plaseLink);
  cardContainer.prepend(newCard);
}

const createCard = (placeName, plaseLink) => {
  const placeTemplate = document.querySelector('#place-template').content;
  const placeElement = placeTemplate.querySelector('.elements__item').cloneNode( true );

  placeElement.querySelector('.elements__btn-trash').addEventListener('click', (evt) => {
    deleteCard(evt.target);
  } );

  placeElement.querySelector('.elements__title').textContent = placeName;

  const placeImg = placeElement.querySelector('.elements__img');
  placeImg.setAttribute('src', plaseLink);
  placeImg.setAttribute('alt', placeName);

  placeElement.querySelector('.elements__img').addEventListener('click', (evt) => {
    popupImageRender(evt.target.alt, evt.target.currentSrc);
  })

  placeElement.querySelector('.elements__btn-heart').addEventListener('click', (evt) => {
    evt.target.classList.toggle('elements__btn-heart_active');
  });

  return placeElement;
}

const deleteCard = (path) => {
  const deleteButton = path.closest( '.elements__item' );
  deleteButton.remove();
}



