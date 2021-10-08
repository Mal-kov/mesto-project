const popup = document.querySelector('.popup');
const popupBtnClose = document.querySelector('.popup__btn-close');
const popupBtnEdit = document.querySelector('.profile__btn-edit');
const popupBtnSave = document.querySelector('.profile__btn-save');


popupBtnEdit.addEventListener( 'click', () => {
  popup.classList.add('popup_opened');
})

popupBtnClose.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
})

popupBtnSave.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
})
