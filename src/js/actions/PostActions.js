// Post Actions
import {ADD_POST, GET_POST, GET_ALL_POSTS, UPDATE_POST, DELETE_POST} from '../constants/ActionTypes';

export function addPost (title, body) {
  return {
    type: ADD_POST,
    title: title,
		body: body
  };
}

export function getPost (id) {
  return {
    type: GET_POST,
		id
  };
}

export function getAllPosts (id) {
  return {
    type: GET_ALL_POSTS,
		id
  };
}

export function updatePost (id) {
  return {
    type: UPDATE_POST,
		id
  };
}

export function deletePost (id) {
  return {
    type: DELETE_POST,
    id
  };
}
