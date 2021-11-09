import FormControl from '@mui/material/FormControl';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Redirect } from 'react-router-dom';
import { Box, Button, TextField, Alert } from '@mui/material';
import { useState } from 'react';
import { register } from './authSlice';

export function Register() {
    const dispatch = useAppDispatch();
    const { isLoggedIn, message, status } = useAppSelector(state => state.auth);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    //@todo: find a way to combine username, email and password into an object
    //@todo: add validation and error handling
    const handleUsername = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setUsername(event.target.value);
    };
    const handlePassword = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    const handleEmail = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //why is event.currentTarget undefined?
        dispatch(register({ username, email, password }));
    };

    if (isLoggedIn) {
        return <Redirect to="/collection" />;
    }

    return (
        <Box component="form" autoComplete="off" onSubmit={handleSubmit}
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 4
        }}>
            <TextField
                label="Username"
                placeholder="Please enter your username"
                value={username}
                onChange={(e) => handleUsername(e)}
                margin="normal"
                required
                error={status === 'failed'}
            />
            <TextField
                label="Email"
                placeholder="Please enter your email"
                value={email}
                type="email"
                onChange={(e) => handleEmail(e)}
                margin="normal"
                required
                error={status === 'failed'}
            />
            <TextField
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
                Sign Up
            </Button>
            {status === "failed" && message && <Alert severity="error">{message}</Alert>}
        </Box>
    )
}