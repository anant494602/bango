import { list } from "../core/apiCore";
export const SET_SEARCH_RESULT = 'SET_SEARCH_RESULT';
export const SET_SEARCH_STATUS = 'SET_SEARCH_STATUS';
export const SET_USER_ID = 'SET_USER_ID';


const setSearchResult =(data) =>({
    type:SET_SEARCH_RESULT,
    payload:data
})
export const setSearchStatus =(data) =>({
    type:SET_SEARCH_STATUS,
    payload:data
})
export const setUserId =(data) =>({
    type:SET_USER_ID,
    payload:data
})

export const setUpSearchResult =({search,category,searched}) => async (dispatch,getState) =>{
    try{
        const response = await list({ search: search || undefined, category: category })
        dispatch(setSearchResult(response));
        dispatch(setSearchStatus(searched));
    }
    catch(error){
        throw error
    }
}