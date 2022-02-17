import { apiConfig } from '../components/constants.js';


const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка - ${response.status}`)
}

// Получение данных о пользователе с сервера
export const getUserInfo = () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers
  })
    .then(checkResponse);
}

// Получение карточек с сервера
export const getCards = () => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers
  })
    .then(checkResponse);
}

// Отправка изменения данных пользователя
export const sendChangeProfile = (newName, newSkills) => {
  // console.log (newName, newSkills);
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: newName,
      about: newSkills
    })
  })
    .then(checkResponse);
}

// Отправка новой карточки Места
export const sendNewCard = (nameOfNewCard, linkOfNewCard) => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: nameOfNewCard,
      link: linkOfNewCard,
    })
  })
    .then(checkResponse);
}

// Удаление карточек
export const deleteMyCard = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  })
    .then(response => {
      if (!response.ok) {
        return Promise.reject(`Ошибка - ${responce.status}`);
      }
    })
}

// Постановка лайка
export const putLike = (likesCardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${likesCardId}`, {
    method: 'PUT',
    headers: apiConfig.headers
  })
    .then(checkResponse);
}

// Снятие лайка
export const deleteLike = (likesCardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${likesCardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  })
    .then(response => {
      if (!response.ok) {
        return Promise.reject(`Ошибка - ${responce.status}`);
      }
    })
}

// Получение кол-ва лайков на карте
// export const getLikes = (cardToCheck) => {
//   return fetch(`${apiConfig.baseUrl}/cards/likes/${cardToCheck}`, {
//     headers: apiConfig.headers
//   })
//     .then(checkResponse);
// }

// Смена аватара пользователя
export const sendChangeAvatar = (newAvatar) => {
  // console.log (newName, newSkills);
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: newAvatar
    })
  })
    .then(checkResponse);
}
