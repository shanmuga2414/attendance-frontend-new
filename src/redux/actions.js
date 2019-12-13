import { ADD_NEW_USER, FETCH_ATTENDANCE } from './constant';

export const saveUser = payload => {
    return {
        type: ADD_NEW_USER,
        payload
    }
}

export const fetchAttendance = (data, history) => {
    return (dispatch, getState) => {
        //    console.log(getState());
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(data => dispatch({
                type: FETCH_ATTENDANCE,
                payload: data
            }))
    }
}