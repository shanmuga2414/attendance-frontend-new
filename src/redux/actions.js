import { ADD_NEW_USER, FETCH_ATTENDANCE } from './constant';

export const saveUser = payload => {
    return {
        type: ADD_NEW_USER,
        payload
    }
}

export const fetchAttendance = (data, history) => (dispatch) => {
    fetch(`http://localhost:8080/employee/fetchAttendance/${data.post}`, {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => console.log(res)//res.json()
        )
        .then(data => dispatch({
            type: FETCH_ATTENDANCE,
            payload: data
        }))
}