// ***************************************************************************************
// Создание / удаление карточек

import {openPopup, closePopup} from './modal';
import {popupPlace, popupImage, fieldBigImage, fieldImgTitle, profileUserId} from '../pages/index'
import {sendNewCard, deleteMyCard, putLike, deleteLike, getLikes} from '../pages/api';

const cardContainer = document.querySelector('.elements__list');
const placeName = document.querySelector('#popup-place-name');
const plaseLink = document.querySelector('#popup-place-link');

export const popupDeleteCard = document.querySelector('.popup_delete-card');
const popupDeleteCardSubmit = popupDeleteCard.querySelector('.popup__btn-save');

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
    .finally( () => {

    })
}

export const addCard = (placeData) => {
  const newCard = createCard(placeData);
  cardContainer.prepend(newCard);
}

const createCard = (placeData) => {
  console.log(placeData);
  let countOfClicks = 0;

  const placeTemplate = document.querySelector('#place-template').content;
  const placeElement = placeTemplate.querySelector('.elements__item').cloneNode( true );

  if (placeData.owner._id === profileUserId) {
    placeElement.querySelector('.elements__btn-trash').addEventListener('click', (evt) => {
      openPopup(popupDeleteCard);
      popupDeleteCardSubmit.addEventListener('click', (evt) => {
        deleteCard(placeData, placeElement);
        console.log(evt);
      } );
    } );
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

  placeElement.querySelector('.elements__btn-heart').addEventListener('click', (evt) => {
    countOfClicks ++;

    if (countOfClicks % 2) {
      console.log('Поставил лайк');
      // console.log(placeData._id);
      putLike(placeData._id)
        .then( cardId => {
          evt.target.classList.toggle('elements__btn-heart_active');
          placeElement.querySelector('.elements__like-count').textContent = cardId.likes.length;
        } )
    } else {
      console.log('Снял лайк');
      deleteLike(placeData._id)
        .then( cardId => {
          evt.target.classList.toggle('elements__btn-heart_active');
          placeElement.querySelector('.elements__like-count').textContent = cardId.likes.length;
        })
    }
  });
  return placeElement;
}

const deleteCard = (placeData, placeElement) => {
  console.log(placeData._id);
  console.log('есть клик на кнопке подтверждения удаления карты');

   deleteMyCard(placeData._id)
      .then( () => {
        placeElement.remove();
        console.log('Карточка успешно удалена');
        closePopup(popupDeleteCard);
        console.log(placeData._id);
        // placeData = {};
      })
     .catch( error => {
       console.log('Ошибка удаления карты');
       console.log(error);
     })
     .finally( () => {});
};


// const deleteCard = (path) => {
//   const deleteButton = path.closest( '.elements__item' );
//   deleteButton.remove();
// }

