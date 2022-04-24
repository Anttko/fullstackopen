import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import anecdoteReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";
import ReduxThunk from 'redux-thunk';

const middlewares = [ReduxThunk];


const reducer = combineReducers({
    anecdoteReducer: anecdoteReducer,
    filterReducer: filterReducer,
    notificationReducer: notificationReducer,
})


export const store = createStore(reducer, compose(applyMiddleware(...middlewares)))
