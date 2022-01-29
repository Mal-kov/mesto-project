// ***************************************************************************************
// Создание / удаление карточек


import {openPopup, closePopup} from '../components/modal';
import {popupPlace, popupImage} from '../pages/index'

const cardContainer = document.querySelector('.elements__list');

export const handleCardFormSubmit = (evt) => {
  evt.preventDefault();

  const placeName = document.querySelector('#popup-place-name');
  const plaseLink = document.querySelector('#popup-place-link');

  addCard(placeName.value, plaseLink.value);

  placeName.value = '';
  plaseLink.value = '';

  closePopup(popupPlace);
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

const popupImageRender = (placeName, plaseLink) => {
  openPopup(popupImage);

  const fieldBigImage = popupImage.querySelector('.popup__image-big');
  fieldBigImage.setAttribute('src', plaseLink);
  fieldBigImage.setAttribute('alt', placeName);

  const fieldImgTitle = popupImage.querySelector('.popup__image-title');
  fieldImgTitle.textContent = placeName;
}


