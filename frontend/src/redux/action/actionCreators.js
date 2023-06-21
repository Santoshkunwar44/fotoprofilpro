import { ActionTypes } from "./ActionTypes"

export const AddCollectionUrl=(payload)=>(dispatch)=>{
    dispatch({
        type:ActionTypes.SET_COLLECTION_IMAGE,
        payload
    })
}

export const AddMJImages=(payload)=>(dispatch)=>{
    dispatch({
        type:ActionTypes.SET_IMAGE_ARR,
        payload
    })
}
export const StartFetching=()=>(dispatch)=>{
    dispatch({
        type:ActionTypes.START_FETCHING,
    })
}
export const StopFetching=()=>(dispatch)=>{
    dispatch({
        type:ActionTypes.STOP_FETCHING,
    })
}

export const setMjProgress=(payload)=>(dispatch)=>{
    dispatch({
        type:ActionTypes.SET_MJ_PROGRESS,
        payload
    })

}

// user actions 

export const addUserAction=(payload)=>(dispatch)=>{
    dispatch({
        type:ActionTypes.ADD_USER,
        payload
    })
}

export const removeUserAction=()=>(dispatch)=>{
    dispatch({
        type:ActionTypes.REMOVE_USER
    })
}

export const addActiveMessageIdAction=(payload)=>(dispatch)=>{
    dispatch({
        type:ActionTypes.ADD_ACTIVE_MESSAGE_ID,
        payload
    })
}

export const addUnseenMessageCountAction=(payload)=>(dispatch)=>{
    
    dispatch({
        type:ActionTypes.ADD_UNSEEN_COUNT,
        payload
    })
}

export const addActiveImageAction=(payload)=>(dispatch)=>{
    
    dispatch({
        type:ActionTypes.ADD_ACTIVE_IMAGE,
        payload
    })
}