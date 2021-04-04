import { CREATE_MESSAGE, GET_ERRORS } from "./actionTypes";

// Create Message
export const createMessage = msg =>{
    return {
        type: CREATE_MESSAGE,
        payload: msg
    }
}


// Create Error
export const returnErrors = (msg, status) =>{
    return {
        type: GET_ERRORS,
        payload: {msg, status}
    }
}

