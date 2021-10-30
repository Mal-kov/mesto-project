// ***************************************************************************************
// 1. Открытие и закрытие модального окна

const popupUserBtnEdit = document.querySelector('.profile__btn-edit');
const popupPlaceBtnAdd = document.querySelector('.profile__btn-add');

const popupImage = document.querySelector('.popup_type_image');
const popupImageBtnClose = popupImage.querySelector('.popup__btn-close');

const popupUser = document.querySelector('.popup_type_profile');
const popupUserBtnClose = popupUser.querySelector('.popup__btn-close');

const popupPlace = document.querySelector('.popup_type_place');
const popupPlaceBtnClose = popupPlace.querySelector('.popup__btn-close');
const popupPlaceForm = popupPlace.querySelector('.popup__form_type_place');

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

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

const popupProfileForm = popupUser.querySelector('.popup__form_type_profile');

function handleFormProfileSubmit(evt) {
  evt.preventDefault();

  const nameInput = popupProfileForm.querySelector('#popup-profile-name');
  const jobInput = popupProfileForm.querySelector('#popup-profile-skills');

  const nameField = document.querySelector('.profile__name');
  const jobField = document.querySelector('.profile__skills');

  nameField.textContent = nameInput.value;
  jobField.textContent = jobInput.value;

  closePopup(popupUser);
}

popupProfileForm.addEventListener('submit', handleFormProfileSubmit);

// ***************************************************************************************
// 3. Форма добавления карточки / 4. Добавление карточки / 5. Лайк карточки  /  6. Удаление карточки

const cardContainer = document.querySelector('.elements__list');

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const placeName = document.querySelector('#popup-place-name');
  const plaseLink = document.querySelector('#popup-place-link');

  addCard(placeName.value, plaseLink.value);

  placeName.value = '';
  plaseLink.value = '';

  closePopup(popupPlace);
}

function addCard(placeName, plaseLink) {
  const newCard = createCard(placeName, plaseLink);
  cardContainer.prepend(newCard);
};

function createCard(placeName, plaseLink) {
  const placeTemplate = document.querySelector('#place-template').content;
  const placeElement = placeTemplate.querySelector('.elements__item').cloneNode( true );

  placeElement.querySelector('.elements__btn-trash').addEventListener('click', (evt) => {
    deleteCard(evt.target);
  } );

  placeElement.querySelector('.elements__title').textContent = placeName;

  const placeImg = placeElement.querySelector('.elements__img');
  placeImg.setAttribute('src', plaseLink);
  placeImg.setAttribute('alt', placeName);

  placeElement.querySelector('.elements__img').addEventListener('click', (evt) => {
    popupImageRender(evt.target.alt, evt.target.currentSrc);
  })

  placeElement.querySelector('.elements__btn-heart').addEventListener('click', (evt) => {
    evt.target.classList.toggle('elements__btn-heart_active');
  });

  return placeElement;
}

function deleteCard(path) {
  const deleteButton = path.closest( '.elements__item' );
  deleteButton.remove();
}

function popupImageRender(placeName, plaseLink) {

  openPopup(popupImage);

  const fieldBigImage = popupImage.querySelector('.popup__image-big');
  fieldBigImage.setAttribute('src', plaseLink);
  fieldBigImage.setAttribute('alt', placeName);

  const fieldImgTitle = popupImage.querySelector('.popup__image-title');
  fieldImgTitle.textContent = placeName;
}

popupPlaceForm.addEventListener('submit', handleCardFormSubmit );

// ***************************************************************************************
//
