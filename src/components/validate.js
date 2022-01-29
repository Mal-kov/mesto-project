// ***************************************************************************************
//Функциональность валидации форм

const showInputError = (inputElement, errorMessage, data) => {
  // console.log('Показать ошибку');
  // const errorMessageElement = inputElement.querySelector(`#${inputElement.id}-error`);
  const errorMessageElement = inputElement.closest(data.popupFormSection).querySelector(data.popupInputTextError);

  errorMessageElement.textContent = errorMessage;
  errorMessageElement.classList.add(data.inputErrorClass);
  inputElement.classList.add(data.errorClass);
}

const hideInputError = (inputElement, data) => {
  //console.log('Нет ошибок');
  const errorMessageElement = inputElement.closest(data.popupFormSection).querySelector(data.popupInputTextError);

  errorMessageElement.textContent = '';
  //console.log(errorMessageElement.classList);
  errorMessageElement.classList.remove(data.inputErrorClass);
  inputElement.classList.remove(data.errorClass);
}

const checkInputValidity = (inputElement, data) => {
  //console.log(inputElement.validationMessage);
  const isInputValid = inputElement.validity.valid;

  if (!isInputValid) {
    const errorMessage = inputElement.validationMessage;
    showInputError(inputElement, errorMessage, data);
  } else {
    hideInputError(inputElement, data);
  }
}

const toggleButtonState = (inputListArr, submitButtonElement, data) => {

  const hasInvalidInput = inputListArr.some( (inputElement) => !inputElement.validity.valid);

  if (hasInvalidInput) {
    submitButtonElement.classList.add(data.inactiveButtonClass);
    submitButtonElement.setAttribute('disabled', true);
  } else {
    submitButtonElement.classList.remove(data.inactiveButtonClass);
    submitButtonElement.removeAttribute('disabled');
  }
}

const setEventListners = (formElement, data) => {
  const inputList = formElement.querySelectorAll(data.inputSelector);
  const inputListArr = Array.from(inputList);
  const submitButtonElement = formElement.querySelector(data.submitButtonSelector);

  inputListArr.forEach( (inputElement) => {
    const handleInput = () => {
      // const {value} = evt.target
      // console.log(value);

      //Запись позволяет выводить информацию о валидности (оставить для тестов)
      // console.log({value, validity: inputElement.validity })

      checkInputValidity(inputElement, data);
      toggleButtonState(inputListArr, submitButtonElement, data);
    }
    inputElement.addEventListener('input', handleInput);
  })
}

export const enableValidation = (data) => {
  //Получаем все формы, которые есть
  const formsList = document.querySelectorAll(data.formSelector);
  //console.log(formSelector);

  //перевод списка в массив
  const formListArr = Array.from(formsList);

  // сброс отправки формы
  const handleFormSubmit = (evt) => {
    evt.preventDefault();
  }

  formListArr.forEach( (formElement) => {
    formElement.addEventListener('submit', handleFormSubmit)
    setEventListners(formElement, data);
  } )
}

