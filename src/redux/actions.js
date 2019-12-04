import { ADD_NEW_USER } from './constant'
export const saveUser = payload =>{
    return {
        type: ADD_NEW_USER,
        payload
    }
}