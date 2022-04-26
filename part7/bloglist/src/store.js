import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import blogReducer from "./reducers/blogReducer";
import notificationReducer from "./reducers/notificationReducer";
import ReduxThunk from "redux-thunk";
import loginReducer from "./reducers/loginReducer";

const middlewares = [ReduxThunk];

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  login: loginReducer,
});

export const store = createStore(
  reducer,
  compose(applyMiddleware(...middlewares))
);
