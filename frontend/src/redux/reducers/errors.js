import { GET_ERRORS } from "../actions/actionTypes";

const initialState = {
    msg: {},
    status: null
}

export default function errorsReducer(state = initialState, action){
    switch(action.type){
        case GET_ERRORS:
            return {
                msg: action.payload.msg,
                status: action.payload.status
            }
        default:
            return state;
    }
}