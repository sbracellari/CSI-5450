import authService from '../../services/auth';
import { User, UserState, LoginUser, RegisterUser, UpdateUser } from '../../app/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');
const userData = localStorage.getItem('user');
let user;

if (userData === null) {
    user = null;
} else {
    const userInfo = JSON.parse(userData);
    user = {
        email: userInfo.email,
        fname: userInfo.fname,
        lname: userInfo.lname,
        password: userInfo.password,
        token: userInfo.token,
    };
}

export const register = createAsyncThunk(
    'auth/register',
    async (user: RegisterUser) => {
        const response = await authService.register(user);
        return response;
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (user: LoginUser) => {
        const response = await authService.login(user);
        return response;
    }
);


export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        const response = await authService.logout();
        return response;
    }
);

export const updateUser = createAsyncThunk(
    'auth/update',
    async (user: UpdateUser) => {
        const response = await authService.updateUser(user);
        return response;
    }
);

const initialState: UserState = {
    isLoggedIn: token !== null,
    user: user,
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
                state.user = action.payload;
                console.log('registration successful', action.payload);
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.status = 'failed';
                console.log('registration failed', action);
            })
            .addCase(login.pending, (state) => {
                console.log('log in pending');
                state.isLoggedIn = false;
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.status = 'idle';
                state.message = '';
                state.user = action.payload;
                console.log('log in successful', action.payload);
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.status = 'failed';
                state.message = 'Unable to login at this time.';
                console.log('log in failed', action);
            })
            .addCase(logout.pending, (state) => {
                state.isLoggedIn = true;
                state.status = 'loading';
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.status = 'idle';
                state.user = null;
                console.log('log out successful');
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoggedIn = true;
                state.status = 'failed';
                state.message = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                console.log('update pending');
                state.isLoggedIn = true;
                state.status = 'loading';
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.status = 'idle';
                state.user = action.payload;
                console.log('update successful', action.payload);
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoggedIn = true;
                state.status = 'failed';
                state.message = 'Unable to update your information at this time.';
                console.log('update failed', action);
            })
    },
});

const { reducer } = authSlice;
export default reducer;