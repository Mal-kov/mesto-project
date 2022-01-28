// инициализацию JS-кода, добавление слушателей и другие важные участки

import {initialCards} from '../components/initial-сards';
import {enableValidation} from '../components/validate';
// import {handleFormProfileSubmit} from '../components/card';


import {openPopup, closePopup} from '../components/modal';


import {handleCardFormSubmit, addCard}  from '../components/card';


// ***************************************************************************************
// Добавил изображения таким образом (не знаю на сколько правильно )) )
import headerLogo from '../images/logo.svg';
import profileImage from '../images/profile__image.jpg';

const headerLogoBlock = document.querySelector('.header__logo');
const profileImageBlock = document.querySelector('.profile__image');
headerLogoBlock.src = headerLogo;
profileImageBlock.src = profileImage



// ***************************************************************************************
// 1. Открытие и закрытие модального окна

const popupUserBtnEdit = document.querySelector('.profile__btn-edit');
const popupPlaceBtnAdd = document.querySelector('.profile__btn-add');

const popupImage = document.querySelector('.popup_type_image');
const popupImageBtnClose = popupImage.querySelector('.popup__btn-close');

const popupUser = document.querySelector('.popup_type_profile');
const popupUserBtnClose = popupUser.querySelector('.popup__btn-close');

export const popupPlace = document.querySelector('.popup_type_place');
const popupPlaceBtnClose = popupPlace.querySelector('.popup__btn-close');
const popupPlaceForm = popupPlace.querySelector('.popup__form_type_place');

popupUserBtnEdit.addEventListener('click', () => {
  openPopup(popupUser);
});

popupUserBtnClose.addEventListener('click', () => {
  closePopup(popupUser);
});

popupPlaceBtnAdd.addEventListener('click', () => {
  openPopup(popupPlace);
});

popupPlaceBtnClose.addEventListener('click', () => {
  closePopup(popupPlace);
});

popupImageBtnClose.addEventListener('click' , () => {
  closePopup(popupImage);
})

// ***************************************************************************************
// Обрботка формы пользователя

export const popupProfileForm = popupUser.querySelector('.popup__form_type_profile');

const nameInput = popupProfileForm.querySelector('#popup-profile-name');
const formError = nameInput.querySelector(`.${nameInput.id}-error`);

nameInput.addEventListener('input', (evt) => {
  checkInputValidity();
})

const jobInput = popupProfileForm.querySelector('#popup-profile-skills');

const checkInputValidity = () => {
  if (!nameInput.validity.valid) {
    showError(nameInput, nameInput.validationMessage);
  } else {
    hideError(nameInput);
  }
};

const showError = (input, errorMessage) => {
  input.classList.add('form__input_type_error');
  formError.textContent = errorMessage;
  formError.classList.add('form__input-error_active');
};

const hideError = (input) => {
  input.classList.remove('form__input_type_error');
  formError.classList.remove('form__input-error_active');
  formError.textContent = '';
};

const handleFormProfileSubmit = (evt) => {
  evt.preventDefault();

  const nameField = document.querySelector('.profile__name');
  const jobField = document.querySelector('.profile__skills');

  nameField.textContent = nameInput.value;
  jobField.textContent = jobInput.value;

  closePopup(popupUser);
}

popupProfileForm.addEventListener('submit', handleFormProfileSubmit);

// Обработка формы добавления новых мест
popupPlaceForm.addEventListener('submit', handleCardFormSubmit );

// Вызов списка мест
initialCards.forEach( item => {
  addCard(item.name, item.link);
})

// включение валидации
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_inactive',
  inputErrorClass: 'popup__input-text-error_active',
  errorClass: 'popup__input-text_err'
});
