import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    user: null,
    isLoggedIn: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { token, user } = action.payload;
            state.token = token;
            state.user = user;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isLoggedIn = false;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
