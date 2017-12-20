import {combineReducers} from 'redux'
import * as Action from '../actions';


const collections= (previousState = [], action = {}) => {

    switch (action.type) {
        case Action.GET_COLLECTIONS_SUCCESS:
            return action.payload
case Action.GET_BOOKS_SUCCESS:
  return action.payload
        default:
            return previousState;


    }
}
const books= (previousState = [], action = {}) => {

    switch (action.type) {
      case Action.GET_BOOKS_SUCCESS:
          return action.payload

          case Action.SET_RATING:
          let state=previousState.map(item=>{
            if(item._id===action.payload.id){
              item.rating=action.payload.value
            }
            return item
          })
          return state

        default:
            return previousState;


    }
}
const singleCollection= (previousState = null, action = {}) => {

    switch (action.type) {
        case Action.GET_SINGLE_COLLECTION_SUCCESS:
            return action.payload

        default:
            return previousState;


    }
}
const flagBook= (previousState = false, action = {}) => {

    switch (action.type) {
        case Action.PUT_FLAG_BOOK:
            return action.payload

        default:
            return previousState;


    }
}
const flagCollection= (previousState = false, action = {}) => {

    switch (action.type) {
        case Action.PUT_FLAG_COLLECTION:
            return action.payload

        default:
            return previousState;


    }
}
export default combineReducers({
collections,
books,
singleCollection,
flagBook,
flagCollection
})
