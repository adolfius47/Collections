import * as types from '../actions';

import axios from "axios"
// import { createParams } from '../../utils/api';


export const AddCollection=(data) => (dispatch) => {
  const url = `/api/collections`

  return axios
    .post(url,data)
    .then((res) => {
      dispatch({
        type: types.GET_INVOICES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: types.GET_INVOICES_FAILURE });
    });
};
export const AddBook=(data) => (dispatch) => {
  const url = `/api/books`

  return axios
    .post(url,data)
    .then((res) => {
      dispatch({
        type: types.GET_INVOICES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: types.GET_INVOICES_FAILURE });
    });
};
export const loadCollections=() => (dispatch) => {
  const url = `/api/collections`

  return axios
    .get(url)
    .then((res) => {
      dispatch({
        type: types.GET_PRODUCTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: types.GET_PRODUCTS_FAILURE });
    });
};
