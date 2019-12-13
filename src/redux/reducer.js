import { ADD_NEW_USER, FETCH_ATTENDANCE } from './constant';

const initialState = {
    count: 0,
    isFetching: false,
    user: {},
    fetchAttendance: {}
}

function reducer(state = initialState, action) {

    switch (action.type) {
        case ADD_NEW_USER:

            return { ...state, user: action.payload }

        case FETCH_ATTENDANCE:
            return {
                ...state,
                fetchAttendance: action.payload.message
            }
        default:
            return state

    }

}
export default reducer