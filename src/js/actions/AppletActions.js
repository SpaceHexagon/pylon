// Applet Actions
import {OPEN_APPLET, SAVE_APPLET_DATA, GET_ALL_APPLETS, CLOSE_APPLET} from '../constants/ActionTypes';

export function openApplet (title, body) {
  return {
    type: OPEN_APPLET,
    title: title,
		body: body
  };
}

export function saveAppletData (id) {
  return {
    type: SAVE_APPLET_DATA,
		id
  };
}

export function getAllApplets (id) {
  return {
    type: GET_ALL_APPLETS,
		id
  };
}

export function closeApplet (id) {
  return {
    type: CLOSE_APPLET,
		id
  };
}
