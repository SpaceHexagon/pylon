// Message Actions
import {ADD_MESSAGE, GET_MESSAGE, GET_ALL_MESSAGES, UPDATE_MESSAGE, DELETE_MESSAGE} from '../constants/ActionTypes';

export function addMessage(to, title, body) {
  return {
    type: ADD_MESSAGE,
		to: to,
    title: title,
		body: body
  };
}

export function getMessage(id) {
  return {
    type: GET_MESSAGE,
		id
  };
}

export function deleteMessage(id) {
  return {
    type: types.DELETE_MESSAGE,
    id
  };
}

export function sendMessage(id) {
  return {
    type: types.SEND_MESSAGE,
    id
  };
}
