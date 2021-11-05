import FormControl from '@mui/material/FormControl';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Redirect } from 'react-router-dom';
import { Box, Button, TextField, Alert, Typography } from '@mui/material';
import { useState } from 'react';
import { login } from './authSlice';

export function Login() {
    const dispatch = useAppDispatch();
    const { isLoggedIn, message, status } = useAppSelector(state => state.auth);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //@todo: find a way to combine username and password into an object
    //@todo: add validation and error handling
    //@todo: add remember me and fogot password?
    const handleUsername = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setUsername(event.target.value);
    };
    const handlePassword = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(login({ username, password }));
    };

    if (isLoggedIn) {
        return <Redirect to="/collection" />;
    }
    console.log(message, status === 'failed');

    return (
        <Box component="form" autoComplete="off" onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 4
            }}>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <TextField
                id="username"
                label="Username"
                placeholder="Please enter your username"
                value={username}
                onChange={(e) => handleUsername(e)}
                margin="normal"
                required
                error={status === 'failed'}
            />
            <TextField
                id="password"
                label="Password"
                placeholder="Please enter your password"
                value={password}
                type="password"
                onChange={(e) => handlePassword(e)}
                margin="normal"
                required
                error={status === 'failed'}
            />
            <Button
                type="submit"
                variant="contained"
            >
                Sign In
            </Button>
            {status === "failed" && message &&
                <Alert sx={{ mt: 1 }} severity="error">{message}</Alert>}
        </Box>
    )
}