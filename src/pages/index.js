import './index.css';

import {initialCards} from '../components/initial-сards';
import {enableValidation} from '../components/validate';
import {openPopup, closePopup, overlayClick, escBtnListener} from '../components/modal';
import {handleCardFormSubmit, addCard}  from '../components/card';

// ***************************************************************************************
// Добавил изображения таким образом (не знаю на сколько правильно )) )

import headerLogo from '../images/logo.svg';
import profileImage from '../images/profile__image.jpg';

const headerLogoBlock = document.querySelector('.header__logo');
const profileImageBlock = document.querySelector('.profile__image');

const popupUserBtnEdit = document.querySelector('.profile__btn-edit');
const popupPlaceBtnAdd = document.querySelector('.profile__btn-add');

export const popupImage = document.querySelector('.popup_type_image');
const popupImageBtnClose = popupImage.querySelector('.popup__btn-close');

const popupUser = document.querySelector('.popup_type_profile');
const popupUserBtnClose = popupUser.querySelector('.popup__btn-close');

export const popupPlace = document.querySelector('.popup_type_place');
const popupPlaceBtnClose = popupPlace.querySelector('.popup__btn-close');
const popupPlaceForm = popupPlace.querySelector('.popup__form_type_place');

const popupProfileForm = popupUser.querySelector('.popup__form_type_profile');
const nameInput = popupProfileForm.querySelector('#popup-profile-name');
const jobInput = popupProfileForm.querySelector('#popup-profile-skills');

export const escButton = '27';

// ***************************************************************************************
// Подстановка изображений

headerLogoBlock.src = headerLogo;
profileImageBlock.src = profileImage

// ***************************************************************************************
// Открытие и закрытие модального окна

popupUserBtnEdit.addEventListener('click', () => {
  openPopup(popupUser);
  overlayClick(popupUser);

});

popupUserBtnClose.addEventListener('click', () => {
  closePopup(popupUser);
});

popupPlaceBtnAdd.addEventListener('click', () => {
  openPopup(popupPlace);
  overlayClick(popupPlace);
});

popupPlaceBtnClose.addEventListener('click', () => {
  closePopup(popupPlace);
});

popupImageBtnClose.addEventListener('click' , () => {
  closePopup(popupImage);
})

// ***************************************************************************************
// Обрботка формы пользователя

const handleFormProfileSubmit = (evt) => {
  evt.preventDefault();

  const nameField = document.querySelector('.profile__name');
  const jobField = document.querySelector('.profile__skills');

  nameField.textContent = nameInput.value;
  jobField.textContent = jobInput.value;

  closePopup(popupUser);
}

popupProfileForm.addEventListener('submit', handleFormProfileSubmit);

// ***************************************************************************************
// Обработка формы добавления новых мест

popupPlaceForm.addEventListener('submit', handleCardFormSubmit );

// ***************************************************************************************
// Вызов списка мест

initialCards.forEach( item => {
  addCard(item.name, item.link);
})

// ***************************************************************************************
// включение валидации
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__btn-save',
  popupFormSection: '.popup__form-section',
  popupInputTextError : '.popup__input-text-error',
  inactiveButtonClass: 'popup__btn-save_inactive',
  inputErrorClass: 'popup__input-text-error_active',
  errorClass: 'popup__input-text_err'
});
