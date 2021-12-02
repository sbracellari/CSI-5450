import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Redirect, Link } from 'react-router-dom';
import { Box, Button, TextField, Alert, Typography } from '@mui/material';
import { useState } from 'react';
import { login } from './authSlice';

export function Login() {
    const dispatch = useAppDispatch();
    const { isLoggedIn, message, status } = useAppSelector(state => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //@todo: add validation and error handling
    //@todo: add remember me and fogot password?
    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string>>) => setState(event.target.value);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(login({ email, password }));
    };

    if (isLoggedIn) {
        return <Redirect to="/collection" />;
    }

    return (
        <Box sx={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Box component="form" autoComplete="off" onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100vh',
                    m: 2
                }}>
                <Typography sx={{fontSize: '1.3rem'}} component="h1" variant="h5">
                    Sign in
                </Typography>
                <TextField
                    id="email"
                    label="Email"
                    placeholder="Please enter your email"
                    value={email}
                    onChange={(e) => handleInput(e, setEmail)}
                    margin="normal"
                    required
                    type="email"
                    error={status === 'failed'}
                />
                <TextField
                    id="password"
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
                    sx={{
                        marginTop: '30px'
                    }}
                    type="submit"
                    variant="contained"
                    onClick={() => handleSubmit}
                >
                    Sign In
                </Button>
                {status === "failed" && message &&
                    <Alert sx={{ mt: 1 }} severity="error">{message}</Alert>}

                <Typography
                    sx={{
                        position: 'absolute', // not particularly a fan of this
                        bottom: 0,
                        fontSize: '0.9rem',
                        margin: '1.3rem'
                    }}
                >
                    New to YourTour? {" "}
                  <Link to='/register'>
                    Create an account
                  </Link>
                </Typography>
            </Box>
        </Box>
    )
}