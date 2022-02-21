import './index.css';
import { apiConfig } from '../components/constants.js';
// import {initialCards} from '../components/initial-сards';
import {enableValidation} from '../components/validate';
import {disabledSubmitBtn} from '../components/utils';
import {openPopup, closePopup, overlayClick} from '../components/modal';
import {handleCardFormSubmit, addCard, popupDeleteCard, popupDeleteCardCloseBtn}  from '../components/card';
import {getUserInfo, getCards, sendChangeProfile, sendChangeAvatar} from './api';

import headerLogo from '../images/logo.svg';
// import profileImage from '../images/profile__image.jpg';

const headerLogoBlock = document.querySelector('.header__logo');
const profileImageBlock = document.querySelector('.profile__image');
const profileUserName = document.querySelector('.profile__name');
const profileUserSkills = document.querySelector('.profile__skills');
export let profileUserId = '';

const popupUserBtnEdit = document.querySelector('.profile__btn-edit');
const popupPlaceBtnAdd = document.querySelector('.profile__btn-add');
const popupAvatarEdit = document.querySelector('.profile__image-edit');

export const popupImage = document.querySelector('.popup_type_image');
export const fieldBigImage = popupImage.querySelector('.popup__image-big');
export const fieldImgTitle = popupImage.querySelector('.popup__image-title');
const popupImageBtnClose = popupImage.querySelector('.popup__btn-close');

const popupUser = document.querySelector('.popup_type_profile');
const popupUserBtnClose = popupUser.querySelector('.popup__btn-close');

export const popupPlace = document.querySelector('.popup_type_place');
const popupPlaceBtnClose = popupPlace.querySelector('.popup__btn-close');
export const popupPlaceBtnSave = popupPlace.querySelector('.popup__btn-save');

const popupPlaceForm = popupPlace.querySelector('.popup__form_type_place');

const popupProfileForm = popupUser.querySelector('.popup__form_type_profile');
const nameInput = popupProfileForm.querySelector('#popup-profile-name');
const jobInput = popupProfileForm.querySelector('#popup-profile-skills');

export const popupAvatar = document.querySelector('.popup_type_avatar');
const popupAvatarBtnClose = popupAvatar.querySelector('.popup__btn-close');
const avatarUrlInput = popupAvatar.querySelector('#popup-avatar-link');
export const popupAvatarBtnSave = popupAvatar.querySelector('.popup__btn-save');

export const escButton = '27';

const nameField = document.querySelector('.profile__name');
const jobField = document.querySelector('.profile__skills');


// ******************************************
// Открытие и закрытие модального окна

popupAvatarEdit.addEventListener('click', () => {
  openPopup(popupAvatar);
});

popupAvatarBtnClose.addEventListener('click', () => {
  closePopup(popupAvatar);
});

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

popupDeleteCardCloseBtn.addEventListener('click', () => {
  closePopup(popupDeleteCard);
})


// ******************************************
// Получение данных о пользователе с сервера

const loadUserInfo = () => {
  getUserInfo(apiConfig)
    .then( (info) => {
      profileImageBlock.src = info.avatar;
      profileUserName.textContent = info.name;
      profileUserSkills.textContent = info.about;
      profileUserId = info._id;

      nameInput.value = info.name;
      jobInput.value = info.about;

      console.log('Загрузка информации о пользователе - выполнена');
      console.log(info);

    } )
    .catch( (error) => {
      console.log('Ошибка загрузки информации о пользователе');
      console.log(error);
    })
    .finally( () => {})
}

headerLogoBlock.src = headerLogo;

// ******************************************
// Обрботка формы изменения аватара

const handleFormAvatarSubmit = (evt) => {
  evt.preventDefault();

  const newAvatar = avatarUrlInput.value;

  sendChangeAvatar(newAvatar)
    .then( (avatar) => {
      console.log(avatar);
      profileImageBlock.src = avatar.avatar;
      avatarUrlInput.value = '';
      closePopup(popupAvatar);
    })
    .catch( (error) => {
      console.log('Ошибка изменения аватара');
      console.log(error);
    })
    .finally( () => {})
}

popupAvatar.addEventListener('submit', handleFormAvatarSubmit);

// ******************************************
// Обрботка формы пользователя

const handleFormProfileSubmit = (evt) => {
  evt.preventDefault();

  //console.log('Форма принята');
  const newName = nameInput.value;
  const newSkills = jobInput.value;
  // nameField.textContent = newName;
  // jobField.textContent = newSkills;

  sendChangeProfile(newName, newSkills)
    .then( (newProfie) => {
      nameField.textContent = newName;
      jobField.textContent = newSkills;
      console.log(`Загрузка Имя: ${newName} Профиль ${newSkills} `);
      console.log('Загрузка изменений имени - выполнена');
      console.log(newProfie);
      closePopup(popupUser);
    })
    .catch( (error) => {
      console.log('Ошибка загрузки изменений ');
      console.log(error);
    })
    .finally( () => {})
}

popupProfileForm.addEventListener('submit', handleFormProfileSubmit);

// ******************************************
// Обработка формы добавления новых мест

popupPlaceForm.addEventListener('submit', handleCardFormSubmit );

// ******************************************
// Загрузка карточек

export const loadOldCards = () => {
  getCards()
    .then( (data) => {
      //console.log('карты загружены и отправлены на отрисовку');
      //console.log(data);
      data.forEach( item => {
        addCard(item);
      })
    })
    .catch( (error) => {
      console.log('Ошибка при отрисовке карт', error);
    })
    .finally( () => {})
}

// ******************************************
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

// ******************************************
// Установка прослушки на клик по оверлейю
overlayClick(popupPlace);
overlayClick(popupUser);
overlayClick(popupImage);
overlayClick(popupDeleteCard);
overlayClick(popupAvatar);

// ******************************************
// Вызов информации о пользователе
loadUserInfo();

// ******************************************
// Вызов готовых карточек
loadOldCards();
