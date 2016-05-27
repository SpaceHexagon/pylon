// Post Actions
import * as types from '../constants/ActionTypes';

export function addPost (title, body) {
  return {
    type: types.ADD_POST,
    title: title,
		body: body
  };
}

export function getPost (id) {
  return {
    type: types.GET_POST,
		id
  };
}

export function getAllPosts (id) {
  return {
    type: types.GET_ALL_POSTS,
		id
  };
}

export function updatePost (id) {
  return {
    type: types.UPDATE_POST,
		id
  };
}

export function deletePost (id) {
  return {
    type: types.DELETE_POST,
    id
  };
}
