// Message Actions
import * as types from '../constants/ActionTypes';

export function addMessage(to, title, body) {
  return {
    type: types.ADD_MESSAGE,
		to: to,
    title: title,
		body: body
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
