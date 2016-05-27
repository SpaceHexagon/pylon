// Building Actions
import {ADD_BUILDING, GET_BUILDING, GET_ALL_BUILDINGS, UPDATE_BUILDING, DELETE_BUILDING} from '../constants/ActionTypes';

export function addBuilding (title, body) {
  return {
    type: types.ADD_BUILDING,
    title: title,
		body: body
  };
}

export function getBuilding (id) {
  return {
    type: types.GET_BUILDING,
		id
  };
}

export function getAllBuildings (id) {
  return {
    type: types.GET_ALL_BUILDINGS,
		id
  };
}

export function updateBuilding (id) {
  return {
    type: types.UPDATE_BUILDING,
		id
  };
}

export function deleteBuilding (id) {
  return {
    type: types.DELETE_BUILDING,
    id
  };
}
