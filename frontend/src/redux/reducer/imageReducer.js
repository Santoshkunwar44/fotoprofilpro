import { ActionTypes } from "../action/ActionTypes";

const INITIAL_STATE ={
    collection_image:null,
    isFetching:false,
    imageArr:[],
    MjProgress:null,
    activeMessageId:null,
    unseenImagesCount:0,
    activeImage:null,
    
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
        case ActionTypes.ADD_ACTIVE_MESSAGE_ID:
            return {...state,activeMessageId:action.payload}
        
        case ActionTypes.ADD_UNSEEN_COUNT:
            return {...state,unseenImagesCount:action.payload}
        
        case ActionTypes.ADD_ACTIVE_IMAGE:
            return {...state,activeImage:action.payload}
        
    
        default:
            return state
    }
    
}