import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userLogin, getUserData } from '../../services/userService';
import { setAccessToken, getAccessToken } from '../../providers/AccessToken';
import { setAuthToken } from '../../providers/AxiosInstance';

const initialState = {
    token: null,
    user: null,
    isLoggedIn: false,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue, dispatch, getState }) => {
        try {
            const response = await userLogin(credentials);

            if (response.access_token) {
                setAccessToken(response.access_token);
                setAuthToken(response.access_token);
                console.log('Token stored:', response.access_token);
            } else if (response.data?.token) {
                setAccessToken(response.data.token);
                setAuthToken(response.data.token);
                console.log('Token stored from nested structure:', response.data.token);
            }

            console.log('Setting up setTimeout for profile fetch...');
            setTimeout(async () => {
                // console.log('setTimeout callback executed - starting profile fetch');
                try {
                    const storedToken = getAccessToken();
                    // console.log('Stored token before profile fetch:', storedToken);
                    const userProfile = await getUserData();
                    // console.log('Profile fetch successful:', userProfile);
                    dispatch(setUserProfile(userProfile));
                } catch (profileError) {
                    // console.warn('Failed to fetch user profile:', profileError);
                }
            }, 2000);

            return response;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Login failed'
            );
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { token, user } = action.payload;
            state.token = token;
            state.user = user;
            state.isLoggedIn = true;
            state.error = null;
        },
        setUserProfile: (state, action) => {
            // console.log('setUserProfile reducer called with:', action.payload);
            state.user = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isLoggedIn = false;
            state.error = null;
            setAccessToken(null);
            setAuthToken(null);
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                const token = action.payload.data?.token || action.payload.access_token;
                state.token = token;
                state.isLoggedIn = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setCredentials, setUserProfile, logout, clearError } = authSlice.actions;

export default authSlice.reducer;
