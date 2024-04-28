const { createAsyncThunk } = require('@reduxjs/toolkit')
const { createSlice } = require('@reduxjs/toolkit')
const axios = require('axios')

const initialState = {
    loading: false,
    users: [],
    error: ''
}

// Generates pending, fulfilled, and rejected action types
const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
    return axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => response.data.map(user => user.id))
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => { // all async actions are done inside extraReducers
        builder
            .addCase(fetchUsers.pending, state => {
                state.loading = true
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false
                state.users = action.payload
                state.error = ''
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false
                state.users = []
                state.error = action.error.message
            })
    }
})

module.exports = userSlice.reducer
module.exports.fetchUsers = fetchUsers