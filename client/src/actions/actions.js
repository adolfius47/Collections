import * as types from '../actions';

import axios from "axios"
// import { createParams } from '../../utils/api';


export const AddCollection=(data) => (dispatch) => {
  const url = `/api/collections`

  return axios
    .post(url,data)
    .then((res) => {
      dispatch({
        type: types.ADD_COLLECTION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: types.ADD_COLLECTION_FAILURE  });
    });
};
export const putCollection=(id,data) => (dispatch) => {
  const url = `/api/collections/${id}`

  return axios
    .put(url,data)
    .then((res) => {
      dispatch({
        type: types.PUT_COLLECTION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: types.PUT_COLLECTION_FAILURE });
    });
};

export const putBook=(id,data) => (dispatch) => {
  const url = `/api/books/${id}`

  return axios
    .put(url,data)
    .then((res) => {
      dispatch({
        type: types.PUT_BOOK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: types.PUT_BOOK_FAILURE});
    });
};

export const AddBook=(data) => (dispatch) => {
  const url = `/api/books`

  return axios
    .post(url,data)
    .then((res) => {
      dispatch({
        type: types.ADD_BOOK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: types.ADD_BOOK_FAILURE });
    });
};
export const AddBookToCollection=(id,data) => (dispatch) => {
  const url = `/api/collections/${id}/books`

  return axios
    .post(url,data)
    .then((res) => {
      dispatch({
        type: types.ADD_BOOK_TO_COLLECTION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: types.ADD_BOOK_TO_COLLECTION_FAILURE });
    });
};
export const RemoveBookFromCollection=(id,data) => (dispatch) => {
  const url = `/api/collections/${id}/books/${data}`

  return axios
    .delete(url,data)
    .then((res) => {
      dispatch({
        type: types.REMOVE_BOOK_FROM_COLLECTION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: types.REMOVE_BOOK_FROM_COLLECTION_FAILURE });
    });
};
export const loadCollections=() => (dispatch) => {
  const url = `/api/collections`

  return axios
    .get(url)
    .then((res) => {
      dispatch({
        type: types.GET_COLLECTIONS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: types.GET_COLLECTIONS_FAILURE });
    });
};
export const loadBooks=() => (dispatch) => {
  const url = `/api/books`

  return axios
    .get(url)
    .then((res) => {
      dispatch({
        type: types.GET_BOOKS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: types.GET_BOOKS_FAILURE });
    });
}

export const loadSingleCollection=(id) => (dispatch) => {
  const url = `/api/collections/${id}`

  return axios
    .get(url)
    .then((res) => {
      dispatch({
        type: types.GET_SINGLE_COLLECTION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: types.GET_BOOKS_FAILURE });
    });
}
export const setRating=(id,value) => ({
  type:types.SET_RATING,
  payload:{id,value}

})
export const putFlagCloseModalCreateCollection=(value) => ({
  type:types.PUT_FLAG_COLLECTION,
  payload:value

})
export const putFlagCloseModalCreateBook=(value) => ({
  type:types.PUT_FLAG_BOOK,
  payload:value

})