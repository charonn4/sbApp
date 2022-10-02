const SET_REQUESTS = 'SET_REQUESTS'
const SET_IS_FETCHING = 'SET_IS_FETCHING'
const SET_REQUEST = 'SET_REQUEST'
const SET_IS_ACTIONED = 'SET_IS_ACTIONED'


const initialState = {
    // все заявки храню в стейте, они сетятся когда открываешь страницу с заявками
    requests: [],
    // isFetching для прелоудера
    isFetching: true,
    // в request хранится заявка на которую мы кликнули (при детализации)
    request: {},
    // isActioned меняется когда с текущей заявки выполняется какое то действие
    isActioned: false
}

export const requestReducer = (state = initialState, action) =>{
    switch(action.type){
        case SET_REQUESTS:
            return {
                ...state,
                requests: action.payload,
                isFetching: false,
                isActioned: false
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload,
            }
        case SET_REQUEST:
            return {
                ...state,
                request: action.payload,
            }
        case SET_IS_ACTIONED:
            return {
                ...state,
                isActioned: action.payload,
            }
        default:
            return state
    }
}

export const setRequests = (requests) => ({ type: SET_REQUESTS, payload: requests })
export const setIsFetching = (bool) => ({ type: SET_IS_FETCHING, payload: bool })
export const setRequest = (data) => ({ type: SET_REQUEST, payload: data })
export const setIsActioned = (bool) => ({ type: SET_IS_ACTIONED, payload: bool })



