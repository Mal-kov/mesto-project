import './index.css';
import {enableValidation} from '../components/validate';
import {disabledSubmitBtn} from '../components/utils';
import {openPopup, closePopup} from '../components/modal';
import {handleCardFormSubmit, addCard}  from '../components/card';
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

const popupUser = document.querySelector('.popup_type_profile');

export const popupPlace = document.querySelector('.popup_type_place');
export const popupPlaceBtnSave = popupPlace.querySelector('.popup__btn-save');

const popupPlaceForm = popupPlace.querySelector('.popup__form_type_place');

const popupProfileForm = popupUser.querySelector('.popup__form_type_profile');
const nameInput = popupProfileForm.querySelector('#popup-profile-name');
const jobInput = popupProfileForm.querySelector('#popup-profile-skills');

export const popupAvatar = document.querySelector('.popup_type_avatar');
const avatarUrlInput = popupAvatar.querySelector('#popup-avatar-link');
export const popupAvatarBtnSave = popupAvatar.querySelector('.popup__btn-save');

export const escButton = '27';

const nameField = document.querySelector('.profile__name');
const jobField = document.querySelector('.profile__skills');


// ******************************************
// Открытие и закрытие модального окна

popupAvatarEdit.addEventListener('click', () => {
  disabledSubmitBtn('popup__btn-save_inactive');
  openPopup(popupAvatar);
});

popupUserBtnEdit.addEventListener('click', () => {
  openPopup(popupUser);
  loadOldCards();
});

popupPlaceBtnAdd.addEventListener('click', () => {
  disabledSubmitBtn('popup__btn-save_inactive');
  openPopup(popupPlace);
});


const popups = document.querySelectorAll('.popup');

popups.forEach( (popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      console.log('Есть клик оверлея');
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__btn-close')) {
      closePopup(popup)
      console.log('Есть клик на кнопке закрытия окна');
    }
  })
})

// ******************************************
// Получение данных о пользователе с сервера

const loadUserInfo = () => {
  getUserInfo()
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
// overlayClick(popupPlace);
// overlayClick(popupUser);
// overlayClick(popupImage);
// overlayClick(popupDeleteCard);
// overlayClick(popupAvatar);

// ******************************************
// Вызов информации о пользователе
// loadUserInfo();

// ******************************************
// Вызов готовых карточек
// loadOldCards();

Promise.all([getUserInfo(), getCards()])
  .then(([userData, cards]) => {
      loadUserInfo(userData);
      loadOldCards(cards);
  })
  .catch( (error) => {
    console.log('Ошибка при отработке общего промиса данные + карты', error);
  });
