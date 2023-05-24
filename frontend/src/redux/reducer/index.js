import { combineReducers } from "redux"
import { imageReducer } from "./imageReducer";


const reducers = combineReducers({
    image: imageReducer,
    

})
export default reducers;
