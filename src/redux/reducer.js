import { ADD_NEW_USER } from './constant'

const initialState = {
    count: 0,
    isFetching: false,
    user: {}
}

function reducer(state = initialState, action) {

    switch (action.type) {
        case ADD_NEW_USER:

            return { ...state, user: action.payload }

        default:
            return state

    }

}
export default reducer