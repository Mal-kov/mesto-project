// ****************************************
// Работа модальных окон

import {escButton, loadOldCards} from '../pages/index';
import {disabledSubmitBtn} from './utils';



export const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened');

  document.addEventListener('keydown', escBtnListener);

  const popupPlaceBlock = popupElement.classList.contains('popup_type_place');
  const popupUserBlock = popupElement.classList.contains('popup__form_type_profile');

  if (popupPlaceBlock){
    disabledSubmitBtn('popup__btn-save_inactive');
  } else if (popupUserBlock) {

    loadOldCards();

  }
  // document.addEventListener('click', overlayClick);
}

export const closePopup = (popupElement) => {
  popupElement.classList.remove('popup_opened');

  document.removeEventListener('keydown', escBtnListener);
  // document.removeEventListener('click', overlayClick);
}

export const overlayClick = (popupElement) => {
  document.addEventListener('click', (evt) => {
    const wrap = evt.target.classList.contains('popup');
    if (wrap) {
      evt.preventDefault();
      closePopup(popupElement);
    }
  })
}

const escBtnListener = (evt) => {
  if ( evt.keyCode == escButton ) {
    const opendPopup = document.querySelector('.popup_opened');
    closePopup(opendPopup);
  }
}
