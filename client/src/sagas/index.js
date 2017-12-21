import {put, takeEvery} from "redux-saga/effects";
import * as types from "../actions";
import * as actions from "../actions/actions";


function* restartEditPage({payload}) {
    yield put(actions.loadSingleCollection(payload._id))
}
function* restartMainPage({payload}) {
    yield put(actions.loadCollections(payload._id))
}



export default function* combineSagas() {
    yield [
        takeEvery([
            types.PUT_COLLECTION_SUCCESS
        ], restartEditPage),
        takeEvery([
            types.ADD_BOOK_TO_COLLECTION_SUCCESS
        ], restartEditPage),
        takeEvery([
            types.REMOVE_BOOK_FROM_COLLECTION_SUCCESS
        ], restartEditPage),
        takeEvery([
            types.ADD_COLLECTION_SUCCESS
        ], restartMainPage),


    ]
}