// arquivo pra juntar os reducers em um só
import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer"

export default combineReducers({
    user: userReducer
})