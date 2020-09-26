import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profileReducer.ts";
import friendsReducer from "./friendsReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer.ts";
import thunkMiddleWare from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import {appReducer} from "./appReducer";


let reducers = combineReducers({
    profileReducer, friendsReducer,
    usersReducer, authReducer, form: formReducer,
    appReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)));

// let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

// window.store = store;

export default store;