import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profileReducer";
import friendsReducer from "./friendsReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleWare from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import {appReducer} from "./appReducer";


let rootReducer = combineReducers({
    profileReducer, friendsReducer,
    usersReducer, authReducer, form: formReducer,
    appReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

type PropertiesType<T> = T extends {[key:string] : infer U} ? U : never

export type InferActionsTypes<T extends {[key:string] : (...arg : any[]) => any}> = ReturnType<PropertiesType<T>>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)));

export type DispatchType = typeof store.dispatch

// let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

// window.store = store;

export default store;