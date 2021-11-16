import authService from '../../services/auth';
import { User, UserState, LoginUser } from '../../app/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const localUser = localStorage.getItem('user');
const user = localUser ? JSON.parse(localUser) : null;


export const register = createAsyncThunk(
    'auth/register',
    async (user: User) => {
        // @todo: might need try catch block
        const response = await authService.register(user);
        return response.data;
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (user: LoginUser) => {
        const response = await authService.login(user);
        return response.data;
    }
);

export const logout = () => localStorage.removeItem('token');

// export const logout = createAsyncThunk(
//     'auth/logout',
//     async () => {
//         const response = await authService.logout();
//         return response;
//     }
// );
// @todo: check is this correct?
const initialState: UserState = {
    isLoggedIn: user ? true : false,
    user: user ? user : null,
    isAdmin: false,
    message: '',
    status: 'idle'
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoggedIn = false;
                state.status = 'loading';
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.status = 'idle';
                state.message = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.status = 'failed';
                state.message = action.payload;
            })
            .addCase(login.pending, (state) => {
                console.log('log in pending');
                state.isLoggedIn = false;
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.status = 'idle';
                //state.message = action.payload;
                state.user = action.payload;
                console.log('log in successful', action.payload);

            })
            .addCase(login.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.status = 'failed';
                state.message = 'Unable to login at this time.';
                console.log('log in failed', action);

            })
            // .addCase(logout.pending, (state) => {
            //     state.isLoggedIn = false;
            //     state.status = 'loading';
            // })
            // .addCase(logout.fulfilled, (state, action) => {
            //     state.isLoggedIn = true;
            //     state.status = 'idle';
            //     //state.message = action.payload;
            //     state.user = null;
            // })
            // .addCase(logout.rejected, (state, action) => {
            //     state.isLoggedIn = false;
            //     state.status = 'failed';
            //     state.message = action.payload;
            // })
    },
});

const { reducer } = authSlice;
export default reducer;