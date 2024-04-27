const redux = require('redux')
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware



const initialState = {
    loading: false,
    users: [],
    error: ''
}

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUESTED
    }
}

const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: users
    }
}

const fetchUsersFailure = error => {
    return {
        type: FETCH_USERS_FAILED,
        payload: error
    }
}


// Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUESTED:
            return {
                ...state,
                loading: true
            }

        case FETCH_USERS_SUCCEEDED:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: '',
            }

        case FETCH_USERS_FAILED:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload
            }

        default:
            return state

    }
}

// action creator
const fetchUsers = () => { // here what the thunk middleware brings to the table is that it enables this action creator to return a function instead of an action object
    return function (dispatch) { // special things about this func:It doesn't have to be pure. It is allowed to have side effects like async API calls. ALso this func. can dispatch actions too
        dispatch(fetchUsersRequest()) // set loading to true
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                // response.data is the users
                const users = response.data.map(user => user.id)
                dispatch(fetchUsersSuccess(users))
            })
            .catch(error => {
                // error.message is the error
                dispatch(fetchUsersFailure(error.message))
            })
    }
}

// store
const store = createStore(reducer, applyMiddleware(thunkMiddleware))
store.subscribe(() => console.log('Updated state', store.getState()))
store.dispatch(fetchUsers())