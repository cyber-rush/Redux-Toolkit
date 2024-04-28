const { cakeActions } = require('../cake/cakeSlice')

const createSlice = require('@reduxjs/toolkit').createSlice

const initialState = {
    numOfIceCreams: 20
}

const iceCreamSlice = createSlice({
    name: "iceCream",
    initialState,
    reducers: {
        ordered: (state) => {
            state.numOfIceCreams--
        },
        restocked: (state, action) => {
            console.log('action payload', action)
            state.numOfIceCreams += action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(cakeActions.ordered, (state) => { // on sale of every cake a free ice cream is also given
                state.numOfIceCreams--
            })
    }
})

module.exports = iceCreamSlice.reducer

module.exports.iceCreamActions = iceCreamSlice.actions