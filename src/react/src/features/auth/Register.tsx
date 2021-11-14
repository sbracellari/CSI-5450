import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Redirect } from 'react-router-dom';
import { Box, Button, TextField, Alert } from '@mui/material';
import { useState } from 'react';
import { register } from './authSlice';

export function Register() {
    const dispatch = useAppDispatch();
    const { isLoggedIn, message, status } = useAppSelector(state => state.auth);

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    //@todo: add validation and error handling
    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string>>) => setState(event.target.value);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //why is event.currentTarget undefined?
        dispatch(register({ fname, lname, email, password }));
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
                label="First Name"
                placeholder="Please enter your first name"
                value={fname}
                onChange={(e) => handleInput(e, setFname)}
                margin="normal"
                required
                error={status === 'failed'}
            />
            <TextField
                label="Last Name"
                placeholder="Please enter your last name"
                value={lname}
                onChange={(e) => handleInput(e, setLname)}
                margin="normal"
                required
                error={status === 'failed'}
            />
            <TextField
                label="Email"
                placeholder="Please enter your email"
                value={email}
                type="email"
                onChange={(e) => handleInput(e, setEmail)}
                margin="normal"
                required
                error={status === 'failed'}
            />
            <TextField
                label="Password"
                placeholder="Please enter your password"
                value={password}
                type="password"
                onChange={(e) => handleInput(e, setPassword)}
                margin="normal"
                required
                error={status === 'failed'}
            />
            <Button
                type="submit"
                variant="contained"
                onClick={() => handleSubmit}
            >
                Sign Up
            </Button>
            {status === "failed" && message && <Alert severity="error">{message}</Alert>}
        </Box>
    )
}