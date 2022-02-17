// утилитарные функции, которые используются в работе сразу нескольких других функций

import {popupPlaceBtnSave, popupAvatarBtnSave} from '../pages/index';

export const disabledSubmitBtn = (inactiveButtonClass) => {
  popupPlaceBtnSave.setAttribute('disabled', true);
  popupPlaceBtnSave.classList.add(inactiveButtonClass);

  popupAvatarBtnSave.setAttribute('disabled', true);
  popupAvatarBtnSave.classList.add(inactiveButtonClass);
}
