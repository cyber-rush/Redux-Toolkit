const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware

const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'

// action creators
function orderCake() {
    return { // this return object is action
        type: CAKE_ORDERED,
        payload: 1,
    }
}

function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty,
    }
}

function orderIceCream(qty = 1) {
    return { // this return object is action
        type: ICECREAM_ORDERED,
        payload: qty,
    }
}

function restockIceCream(qty = 1) {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty,
    }
}

// const initialState = {
//     numOfCakes: 10,
//     numofIceCreams: 20
// }

const initialCakeState = {
    numOfCakes: 10
}

const initialIceCreamState = {
    numofIceCreams: 20
}

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,     // first make a copy and then update the required thing only
                numOfCakes: state.numOfCakes - 1
            }


        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }

        default:
            return state
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {

    switch (action.type) {

        case ICECREAM_ORDERED:
            return {
                ...state,
                numofIceCreams: state.numofIceCreams - action.payload
            }

        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numofIceCreams: state.numofIceCreams + action.payload
            }

        default:
            return state

    }
}


const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})
// Store setup

const store = createStore(rootReducer, applyMiddleware(logger))
console.log('Initial state of cake', store.getState().cake)
console.log('Initial state of Ice cream', store.getState().iceCream)

const unsubscribe = store.subscribe(() => { })
// Listener for the store ---> Anytime the store updates then this subscribe function is called

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(3))

// not really necessary
const actions = bindActionCreators({ orderCake, restockCake, orderIceCream, restockIceCream }, store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)
actions.orderIceCream(4)
actions.restockIceCream(2)

unsubscribe()
