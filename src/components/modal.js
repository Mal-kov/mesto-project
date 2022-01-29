// ***************************************************************************************
// Работа модальных окон

import {escButton} from '../pages/index';

export const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened');
  escBtnListener(popupElement);
  // document.addEventListener('keydown', escBtnListener(popupElement));
  // console.log(popupElement);
  // escBtnListenerAdd(popupElement);

}

export const closePopup = (popupElement) => {
  popupElement.classList.remove('popup_opened');
  // document.removeEventListener('keydown', escBtnListener);
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



const escBtnListener = (popupElement) => {
  document.addEventListener('keydown', (evt) => {
    if ( evt.keyCode == escButton ) {
      // console.log(evt.target);
      // console.log(popupElement);
      closePopup(popupElement);
      document.removeEventListener('keydown', escBtnListener);
    }
  });
}



// (evt) => {
//     if ( evt.keyCode == 27 ) {
//       console.log(evt)
//       closePopup(evt.target);
//       document.removeEventListener('keydown', escBtnListener);
//     }
//   }

// export const escBtnListener = (evt) => {
//   if ( evt.keyCode == 27 ) {
//     console.log(evt)
//     closePopup(evt.target);
//     document.removeEventListener('keydown', escBtnListener);
//   }
// }

// const escBtnListenerAdd = (popup) => {
//   document.addEventListener('keydown', escBtnListener);
// }

// const escBtnListenerRemove = (popup) => {
//   document.removeEventListener()

// }
