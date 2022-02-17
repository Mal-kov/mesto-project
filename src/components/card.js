// ***************************************************************************************
// Создание / удаление карточек


import {openPopup, closePopup} from './modal';
import {popupPlace, popupImage, fieldBigImage, fieldImgTitle, profileUserId} from '../pages/index'
import {disabledSubmitBtn} from './utils';
import {sendNewCard, deleteMyCard, putLike, deleteLike, getLikes} from '../pages/api';
// import {getCards} from './api';

const cardContainer = document.querySelector('.elements__list');
const placeName = document.querySelector('#popup-place-name');
const plaseLink = document.querySelector('#popup-place-link');

export const popupDeleteCard = document.querySelector('.popup_delete-card');
export const popupDeleteCardCloseBtn = popupDeleteCard.querySelector('.popup__btn-close');
const popupDeleteCardSubmit = popupDeleteCard.querySelector('.popup__btn-save');



const popupImageRender = (placeName, plaseLink) => {
  openPopup(popupImage);

  fieldBigImage.setAttribute('src', plaseLink);
  fieldBigImage.setAttribute('alt', placeName);
  fieldImgTitle.textContent = placeName;
}

export const handleCardFormSubmit = (evt) => {
  evt.preventDefault();

  sendNewCard(placeName.value, plaseLink.value)
    .then( newPlace => {
      console.log('Новая карточка создана');
      console.log(newPlace);

      addCard(newPlace);
    })
    .catch( error => {
      console.log('Ошибка создания новой карточки');
      console.log(error);
    })
    .finally( () => {
      placeName.value = '';
      plaseLink.value = '';

      closePopup(popupPlace);
      disabledSubmitBtn(popupPlace, );
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
  // const btnForMyCard = createElement('<button type="button" class="elements__btn-trash"></button>');

  if (  placeData.owner._id === profileUserId ) {


    placeElement.querySelector('.elements__btn-trash').addEventListener('click', (evt) => {

      openPopup(popupDeleteCard);

      popupDeleteCardSubmit.addEventListener('click', (evt) => {
        console.log('есть клик на кнопке подтверждения');
        console.log(evt.target);
        deleteMyCard(placeData._id)
          .then( (place) => {
            // deleteCard(place);
            console.log(place);
            closePopup(popupDeleteCard);
          })
          .catch( error => {
            console.log('Ошибка удаления карты');
            console.log(error);
          })
      })
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
    popupImageRender(evt.target.alt, evt.target.currentSrc);
  })

  placeElement.querySelector('.elements__btn-heart').addEventListener('click', (evt) => {
    evt.target.classList.toggle('elements__btn-heart_active');

    countOfClicks ++;

    if (countOfClicks % 2) {
      console.log('Поставил лайк');
      console.log(placeData._id);
      putLike(placeData._id)
        .then( cardId => {
          placeElement.querySelector('.elements__like-count').textContent = cardId.likes.length;
        } )
    } else {
      console.log('Снял лайк');
      deleteLike(placeData._id)
        .then( cardId => {
          placeElement.querySelector('.elements__like-count').textContent = cardId.likes.length;
        })
    }
  });

  return placeElement;
}

// const deleteCard = (path) => {
//   const deleteButton = path.closest( '.elements__item' );
//   deleteButton.remove();
// }



