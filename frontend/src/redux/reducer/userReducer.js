import { ActionTypes } from "../action/ActionTypes";

const INITIAL_STATE ={
    data:null,
    
}
export const userReducer=(state=INITIAL_STATE,action)=>{

    switch (action.type) {
        case ActionTypes.ADD_USER:
                return {...state,data:action.payload}


        case ActionTypes.REMOVE_USER:
            return {...state,data:null}
    
        default:
            return state
    }
    
}