const { createStore } = require("redux")
const produce = require('immer').produce

const initialState = {
    name: "Ujjawal",
    address: {
        street: "Vijay Nagar, Scheme 78",
        city: "Indore",
        state: "Madhya Pradesh"
    }
}

const STREET_UPDATED = 'STREET_UPDATED'
const updateStreet = (street) => {
    return {
        type: STREET_UPDATED,
        payload: street
    }
}

const streetReducer = (state = initialState, action) => {
    switch (action.type) {
        case STREET_UPDATED:
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload
            //     }
            // }

            return produce(state, (draft) => {
                draft.address.street = action.payload
            })

        default:
            return state
    }
}

const store = createStore(streetReducer)
console.log('Initial state:', store.getState())

const unsubscribe = store.subscribe(() => console.log('Updated state:', store.getState()))
store.dispatch(updateStreet('Marathalli'))

unsubscribe()