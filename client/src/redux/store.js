import { applyMiddleware, createStore } from "redux"

import { createLogger } from "redux-logger"
import thunk from "redux-thunk"

import reducer from "./root-reducer";
const middleware = applyMiddleware( thunk, createLogger())
export default createStore(reducer, middleware)