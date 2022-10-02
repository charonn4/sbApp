import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {userReducer} from "./reducers/userReducer";
import {requestReducer} from "./reducers/requestReducer";


const rootReducer = combineReducers({
    request: requestReducer,
    user: userReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
