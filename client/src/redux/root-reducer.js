import { combineReducers } from "redux"

import post_value from "./reducers/post-reducer"
import auth_value from "./reducers/auth-reducer"

export default combineReducers({
    post_value,auth_value
})