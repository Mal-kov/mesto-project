// ****************************************
// Работа модальных окон

import {escButton} from '../pages/index';

export const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', escBtnListener);
}

export const closePopup = (popupElement) => {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', escBtnListener);
}

const escBtnListener = (evt) => {
  if ( evt.keyCode == escButton ) {
    const opendPopup = document.querySelector('.popup_opened');
    closePopup(opendPopup);
  }
}
