// ****************************************
// Работа модальных окон

import {escButton} from '../pages/index';
import {disabledSubmitBtn} from './utils';

export const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened');

  document.addEventListener('keydown', escBtnListener);

  const popupBlock = popupElement.classList.contains('popup_type_place');
  if (popupBlock){
    disabledSubmitBtn('popup__btn-save_inactive');
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
