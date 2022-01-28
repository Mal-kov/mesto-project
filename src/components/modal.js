// ***************************************************************************************
// Работа модальных окон

export const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened');

  escBtnListener(popupElement);
  overlayClick(popupElement);
}

export const closePopup = (popupElement) => {
  popupElement.classList.remove('popup_opened');
}

const overlayClick = (popupElement) => {
  document.addEventListener('click', (evt) => {
    const wrap = evt.target.classList.contains('popup');
    if (wrap) {
      evt.preventDefault();
      closePopup(popupElement);
    }
  })
}

const escBtnListener = (popup) => {
  document.addEventListener('keydown', (evt) => {
    if ( evt.keyCode == 27 ) {
      closePopup(popup);
    }
  })
}

