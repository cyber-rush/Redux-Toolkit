// A slice effectively takes care of :
// 1) defining an action type constant
// 2) an action object
// 3) an action creater
// 4) switch statements in the reducer
// 5) handling the immutable updates in the reducer

const createSlice = require('@reduxjs/toolkit').createSlice

const initialState = {
    numOfCakes: 10
}

// createSlice will automatically create action creators with the same name as mentioned in the reducers
const cakeSlice = createSlice({
    name: 'cake',
    initialState, // Its an ES6 property ..when key === value we can write it as single
    reducers: {
        ordered: (state) => {
            state.numOfCakes--
        },
        restocked: (state, action) => {
            state.numOfCakes += action.payload
        }
    }
})

// It returns the main reducer function which we can provide to the redux store
module.exports = cakeSlice.reducer

// actions as the named export
module.exports.cakeActions = cakeSlice.actions