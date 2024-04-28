const configureStore = require('@reduxjs/toolkit').configureStore
const reducer = require('../features/cake/cakeSlice')
const cakeReducer = require('../features/cake/cakeSlice')
const iceCreamReducer = require('../features/iceCream/iceCreamSlice')
console.log('cakeRed', cakeReducer)

const store = configureStore({
    reducer: {
        cake: cakeReducer,
        iceCream: iceCreamReducer,
    },

})

console.log('store', store)

module.exports = store