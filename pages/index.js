
const cardContainer = document.querySelector('.elements__list');


// ***************************************************************************************
// 1. Открытие и закрытие модального окна

const popupUserBtnEdit = document.querySelector('.profile__btn-edit');
const popupPlaceBtnAdd = document.querySelector('.profile__btn-add');

const popupUser = document.querySelector('.popup');
const popupUserBtnClose = popupUser.querySelector('.popup__btn-close');

const popupPlace = document.querySelector('.popup-place');
const popupPlaceBtnClose = popupPlace.querySelector('.popup__btn-close');
const popupPlaceForm = popupPlace.querySelector('.popup__form');


function openPopup(popupElement) {
  popupElement.classList.add( 'popup_opened' );
}
function closePopup(popupElement) {
  popupElement.classList.remove( 'popup_opened' );
}


popupUserBtnEdit.addEventListener( 'click', () => {
  openPopup(popupUser);
});

popupUserBtnClose.addEventListener('click', () => {
  closePopup(popupUser);
});

popupPlaceBtnAdd.addEventListener( 'click', () => {
  openPopup(popupPlace);
});

popupPlaceBtnClose.addEventListener( 'click', () => {
  closePopup(popupPlace);
});

// ***************************************************************************************
// 2. Заполнение карточек от JS

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach( item => {
  addCard(item.name, item.link);
})


// ***************************************************************************************
// Обрботка формы пользователя

const formElement = popupUser.querySelector('.popup__form');

function formSubmitHandler (evt) {
  evt.preventDefault();

  const nameInput = formElement.querySelector('#popupProfileName');
  const jobInput = formElement.querySelector('#popupProfileSkills');

  const nameField = document.querySelector('.profile__name');
  const jobField = document.querySelector('.profile__skills');

  console.log(nameInput.value);
  console.log(jobInput.value);

  nameField.textContent = nameInput.value;
  jobField.textContent = jobInput.value;

  closePopup(popupUser);
}

formElement.addEventListener('submit', formSubmitHandler);

// ***************************************************************************************
// 3. Форма добавления карточки / 4. Добавление карточки / 5. Лайк карточки  /  6. Удаление карточки



function getPopupPlaces( evt ) {
  evt.preventDefault();

  const plaseName = document.querySelector( '#popupPlaceName' );
  const plaseLink = document.querySelector( '#popupPlaceLink' );
  addCard( plaseName.value, plaseLink.value );

  plaseName.value = '';
  plaseLink.value = '';

  closePopup(popupPlace);
}

function addCard( plaseName, plaseLink ) {
  const placeTemplate = document.querySelector( '#place-template' ).content;
  const placeElement = placeTemplate.querySelector( '.elements__item' ).cloneNode( true );

  placeElement.querySelector( '.elements__btn-trash' ).addEventListener( 'click', () => {
    const deleteButton = placeElement.querySelector( '.elements__btn-trash' ).closest( '.elements__item' );
    deleteButton.remove();
  });
  placeElement.querySelector( '.elements__title' ).textContent = plaseName;
  placeElement.querySelector( '.elements__img' ).setAttribute('src', plaseLink);
  placeElement.querySelector( '.elements__img' ).setAttribute('alt', plaseName);
  placeElement.querySelector( '.elements__btn-heart' ).addEventListener( 'click', (evt) => {
    const like = evt.target;
    like.classList.toggle( 'elements__btn-heart_active' );
  });

  cardContainer.prepend( placeElement );
};

popupPlaceForm.addEventListener( 'submit', getPopupPlaces );

// ***************************************************************************************
//







