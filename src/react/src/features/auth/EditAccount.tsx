import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Redirect } from 'react-router-dom';
import { Box, Button, TextField, Alert, Typography } from '@mui/material';
import { useState } from 'react';
import { updateUser } from '../../services/api';

export function EditAccount() {
    const dispatch = useAppDispatch();
    const { isLoggedIn, message, status, user } = useAppSelector(state => state.auth);

    const [fname, setFname] = useState(user?.fname);
    const [lname, setLname] = useState(user?.lname);
    const [password, setPassword] = useState(user?.password);

    //@todo: add validation and error handling

    if (!isLoggedIn) { 
        <Redirect to='/login' />;
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // dispatch(updateUser({ fname, lname, password })); // how to call this?
    };

    return (
        <Box sx={{height: '90vh', display: 'flex', justifyContent: 'center'}}>
            <Box component="form" autoComplete="off" onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100vh',
                    m: 'auto'
                }}>
                <Typography sx={{fontSize: '1.3rem', mb: 2}} component="h1" variant="h5">
                    Edit information
                </Typography>
                <TextField
                    label="First Name"
                    defaultValue={user?.fname}
                    onChange={(e) => setFname(e.target.value)}
                    margin="normal"
                    required
                    error={status === 'failed'}
                />
                <TextField
                    label="Last Name"
                    defaultValue={user?.lname}
                    onChange={(e) => setLname(e.target.value)}
                    margin="normal"
                    required
                    error={status === 'failed'}
                />
                <TextField
                    label="Password"
                    defaultValue={user?.password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    required
                    error={status === 'failed'}
                />
                <Button
                    sx={{ marginTop: '30px' }}
                    type="submit"
                    variant="contained"
                    onClick={() => handleSubmit}
                >
                    Submit
                </Button>
                {status === "failed" && message && <Alert severity="error">{message}</Alert>}
            </Box>
        </Box>
    )
}