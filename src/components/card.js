// ***************************************************************************************
// Создание / удаление карточек

import {openPopup, closePopup, openPopupDeleteCard} from './modal';
import {popupPlace, popupImage, fieldBigImage, fieldImgTitle, profileUserId} from '../pages/index'
import {sendNewCard, deleteMyCard, putLike, deleteLike} from '../pages/api';

const cardContainer = document.querySelector('.elements__list');
const placeName = document.querySelector('#popup-place-name');
const plaseLink = document.querySelector('#popup-place-link');

const renderPopupImage = (placeName, plaseLink) => {
  openPopup(popupImage);

  fieldBigImage.setAttribute('src', plaseLink);
  fieldBigImage.setAttribute('alt', placeName);
  fieldImgTitle.textContent = placeName;
}

export const handleCardFormSubmit = (evt) => {
  evt.preventDefault();

  sendNewCard(placeName.value, plaseLink.value)
    .then( (newPlace) => {
      console.log('Новая карточка создана');
      console.log(newPlace);

      addCard(newPlace);
      closePopup(popupPlace);
      // disabledSubmitBtn(popupPlace);
      placeName.value = '';
      plaseLink.value = '';
    })
    .catch( (error) => {
      console.log('Ошибка создания новой карточки');
      console.log(error);
    })
}

export const addCard = (placeData) => {
  const newCard = createCard(placeData);
  cardContainer.prepend(newCard);
}

const createCard = (placeData) => {
  console.log(placeData);
  const placeTemplate = document.querySelector('#place-template').content;
  const placeElement = placeTemplate.querySelector('.elements__item').cloneNode( true );

  if (placeData.owner._id === profileUserId) {
    actionToDeleteCard(placeData, placeElement);
  } else {
    placeElement.querySelector('.elements__btn-trash').remove();
  }

  placeElement.querySelector('.elements__title').textContent = placeData.name;
  placeElement.querySelector('.elements__like-count').textContent = placeData.likes.length;

  const placeImg = placeElement.querySelector('.elements__img');
  placeImg.setAttribute('src', placeData.link);
  placeImg.setAttribute('alt', placeData.name);

  placeElement.querySelector('.elements__img').addEventListener('click', (evt) => {
    renderPopupImage(evt.target.alt, evt.target.currentSrc);
  })

  handleForLikeDislike(placeData, placeElement);

  return placeElement;
}


const actionToDeleteCard = (placeData, placeElement) => {
  placeElement.setAttribute('data-id', placeData._id);
  placeElement.querySelector('.elements__btn-trash').addEventListener('click', () => {

    console.log('есть клик на кнопке подтверждения удаления карты');
      deleteMyCard(placeData._id)
      .then( () => {
        placeElement.remove();
        console.log('Карточка успешно удалена');
        console.log(placeData._id);
      })
      .catch( error => {
        console.log('Ошибка удаления карты');
        console.log(error);
      })
  } );
}

const handleForLikeDislike = (placeData, placeElement) => {
  let countOfClicks = 0;

  placeElement.querySelector('.elements__btn-heart').addEventListener('click', (evt) => {
    countOfClicks ++;

    if (countOfClicks % 2) {
      console.log('Поставил лайк');
      putLike(placeData._id)
        .then( cardId => {
          evt.target.classList.toggle('elements__btn-heart_active');
          placeElement.querySelector('.elements__like-count').textContent = cardId.likes.length;
        } )
        .catch( error => {
          console.log('Ошибка постановки лайка', error);
        })
    } else {
      console.log('Снял лайк');
      deleteLike(placeData._id)
        .then( cardId => {
          evt.target.classList.toggle('elements__btn-heart_active');
          placeElement.querySelector('.elements__like-count').textContent = cardId.likes.length;
        })
        .catch( error => {
          console.log('Ошибка удаления лайка', error);
        })
    }
  });
}


