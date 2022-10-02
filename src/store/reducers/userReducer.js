const SET_AUTHORIZED = 'SET_AUTHORIZED'
const SET_LOGOUT = 'SET_LOGOUT'
const SET_IS_ERROR = 'SET_IS_ERROR'
const SET_REGISTER = 'SET_REGISTER'

const initialState = {
    isAuthorized: false,
    isError: false,
    isRegister: false
}

export const userReducer = (state = initialState, action) =>{
    switch(action.type){
        case SET_AUTHORIZED:
            return {
                ...state,
                isAuthorized: action.payload,
            }
        case SET_LOGOUT:
            return {
                ...state,
                isAuthorized: action.payload,
            }
        case SET_IS_ERROR:
            return {
                ...state,
                isError: action.payload,
            }
        case SET_REGISTER:
            return {
                ...state,
                isRegister: action.payload,
            }
        default:
            return state
    }
}


export const setAuthorized = (bool) => ({ type: SET_AUTHORIZED, payload: bool })
export const setLogout = (bool) => ({ type: SET_LOGOUT, payload: bool })
export const setIsError = (bool) => ({ type: SET_IS_ERROR, payload: bool })
export const setRegister = (bool) => ({ type: SET_REGISTER, payload: bool })

