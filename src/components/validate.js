//Функциональность валидации форм

//А все другие функции, включая декларирование функции enableValidation и валидации форм, — в отдельном файле validate.js.


//export const nameInput = popupProfileForm.querySelector('#popup-profile-name');

const showInputError = (inputElement, errorMessage) => {
  console.log('Показать ошибку');

  // const errorMessageElement = inputElement.querySelector(`#${inputElement.id}-error`);

  const errorMessageElement = inputElement.closest('.popup__form').querySelector('.popup__input-text-error');

  errorMessageElement.textContent = errorMessage;
  errorMessageElement.classList.add('popup__input-text-error_active')


}

const hideInputError = (inputElement) => {
  console.log('Спрятать ошибку');
}

const checkInputValidity = (inputElement) => {

  console.log(inputElement.validationMessage);

  const isInputValid = inputElement.validity.valid;

  if (!isInputValid) {
    const errorMessage = inputElement.validationMessage;
    showInputError(inputElement, errorMessage);
  } else {
    hideInputError(inputElement);
  }
}


const setEventListners = (formElement) => {
  const inputList = formElement.querySelectorAll('.popup__input-text');
  const inputListArr = Array.from(inputList);
  const submitButtonElement = formElement.querySelectorAll('.popup__btn-save');

  inputListArr.forEach( (inputElement) => {
    inputElement.addEventListener('input', (evt) => {


      const {value} = evt.target
      console.log(value);

      //Запись позволяет выводить информацию о валидности (оставить для тестов)
      console.log({value, validity: inputElement.validity })

      checkInputValidity(inputElement);


    })
  })

}

export const enableValidation = () => {

  //Получаем все формы, которые есть
  const formsList = document.querySelectorAll('.popup__form')

  //перевод списка в массив
  const formListArr = Array.from(formsList);

  // обработчик поля
  const handleFormSubmit = (evt) => {
    evt.preventDefault();

  }



  formListArr.forEach( (formElement) => {
    formElement.addEventListener('submit', handleFormSubmit)

    setEventListners(formElement);

  } )

}


