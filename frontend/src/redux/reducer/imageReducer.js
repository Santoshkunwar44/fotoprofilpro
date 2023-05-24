import { ActionTypes } from "../action/ActionTypes";

const INITIAL_STATE ={
    collection_image:null,
    isFetching:false,
    imageArr:[],
    MjProgress:null
    
}
export const imageReducer=(state=INITIAL_STATE,action)=>{

    switch (action.type) {
        case ActionTypes.SET_COLLECTION_IMAGE:
                return {...state,collection_image:action.payload}

        case ActionTypes.SET_IMAGE_ARR:
            return {...state,imageArr:[...state.imageArr,action.payload]}

        case ActionTypes.SET_MJ_PROGRESS:
            return {...state,MjProgress:action.payload}
        case ActionTypes.START_FETCHING:
            return {...state,isFetching:true }
        case ActionTypes.STOP_FETCHING:
            return {...state,isFetching:false }
    
        default:
            return state
    }
    
}