import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Redirect } from 'react-router-dom';
import { Box, Button, TextField, Alert, Typography, Avatar, Paper } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import { updateUser } from '../auth/authSlice';

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
        dispatch(updateUser({ fname, lname, password }));
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', }}>
            <Paper elevation={1} sx={{
                width: 400, height: 740,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center',
            }}>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100vh',
                    m: 10
                }}>
                    <Avatar
                        sx={{ width: 56, height: 56, m: 2, bgcolor: '#1976d2' }}
                    >
                        <PersonIcon /></Avatar>
                    <Typography sx={{ fontSize: '1.3rem', mb: 2 }} component="h1" variant="h5">
                        Account Info
                    </Typography>
                    <Typography sx={{ fontSize: '1.2rem', }} component="h1" variant="subtitle1">
                        {user?.fname}  {user?.lname}
                    </Typography>
                    <Typography sx={{ fontSize: '1.2rem', }} component="h1" variant="subtitle1">
                        {user?.email}
                    </Typography>

                </Box>
                <Box component="form" autoComplete="off" onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100vh',
                    }}>
                    <Typography sx={{ fontSize: '1.3rem', mb: 2 }} component="h1" variant="h5">
                        Edit information
                    </Typography>
                    <TextField
                        label="First Name"
                        defaultValue={fname}
                        onChange={(e) => setFname(e.target.value)}
                        margin="normal"
                        required
                        error={status === 'failed'}
                    />
                    <TextField
                        label="Last Name"
                        defaultValue={lname}
                        onChange={(e) => setLname(e.target.value)}
                        margin="normal"
                        required
                        error={status === 'failed'}
                    />
                    <TextField
                        label="Password"
                        defaultValue={password}
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
            </Paper>

        </Box>
    )
}