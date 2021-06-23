import {SET_SEARCH_RESULT,SET_SEARCH_STATUS,SET_USER_ID} from './action';

const INITIAL_STATE ={
    searchResult:[],
    searched:false,
    UserId: ''
}

export default function (state=INITIAL_STATE,action){
    switch (action.type) {
        case 'SET_SEARCH_RESULT': {
          return {
                 ...state,
                 searchResult: action.payload
          }
        }
        case 'SET_SEARCH_STATUS': {
            return {
                ...state,
                searched:action.payload 
            }
          }
          case 'SET_USER_ID': {
            return {
                ...state,
                UserId:action.payload 
            }
          }
        
        default:
          return state
      }
}