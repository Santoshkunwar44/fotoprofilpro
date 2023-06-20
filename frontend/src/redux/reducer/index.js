import { combineReducers } from "redux"
import { imageReducer } from "./imageReducer";
import { userReducer } from "./userReducer";


const reducers = combineReducers({
    image: imageReducer,
    user:userReducer
    

})
export default reducers;
