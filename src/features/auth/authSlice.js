import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: { _id: null, username: null, email: null, token: null, list: null  },
    reducers: {
        setCredentials: (state, action) => {
            const { email, accessToken, username, _id, list } = action.payload
            state.username = username
            state.email = email
            state.token = accessToken
            state._id = _id
            state.list = list
        },
        logOut: (state, action) => {
            state.username = null
            state.email = null
            state.token = null
            state._id = null
            state.list = null
        }
    }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentEmail = (state) => state.auth.email
export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentUsername = (state) => state.auth.username
export const selectCurrentid = (state) => state.auth._id
export const selectCurrentList = (state) => state.auth.list