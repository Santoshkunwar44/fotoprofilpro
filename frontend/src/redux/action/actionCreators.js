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