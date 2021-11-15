import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Redirect, Link } from 'react-router-dom';
import { 
    Box, 
    Button, 
    Modal, 
    IconButton,
    Card,
    CardHeader,
    CardContent,
    List,
    ListItem,
    ListItemIcon,
    ListItemButton,
    ListItemText,
    CardActions
} from '@mui/material';
import { useState } from 'react';
import { logout } from './authSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';

export function AccountInfo() {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { isLoggedIn, message, status, user } = useAppSelector(state => state.auth);

    return (
        <>
            <Box sx={{width: '10%', display: 'flex', justifyContent: 'center'}} >
                <IconButton onClick={handleOpen} sx={{m: 1}} >
                    <AccountCircleIcon color='primary' sx={{fontSize: '2rem'}} />
                </IconButton>
            </Box>
            <Modal
              open={open}
              onClose={handleClose}
              
            >
                <Box 
                    sx={{
                        position: 'absolute', 
                        top: '50%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'white',
                        borderRadius: '4px'
                    }}
                >
                    <Card sx={{ p: 0 }}>
                        <CardHeader
                            avatar={
                                <AccountCircleIcon color='primary' sx={{fontSize: '2rem'}} />
                            }
                            title={`${user?.fname} ${user?.lname}`} 
                            subheader={`${user?.email}`}
                            sx={{ borderBottom: '1px solid lightgray'}}
                        />
                        <CardContent sx={{p: 0}} >
                            <List sx={{mt: 2, mb: 1}}>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={handleClose} component={Link} to='/account/update'>
                                        <ListItemIcon>
                                            <EditIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Edit account information" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => dispatch(logout)} component={Link} to='/'>
                                        <ListItemIcon>
                                            <LogoutIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Logout" sx={{fontSize: '0.9rem'}} />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </CardContent>
                        <CardActions sx={{float: 'right'}} >
                            <Button onClick={handleClose} size="small">Close</Button>
                        </CardActions>
                     </Card>
                </Box>
            </Modal>
        </>
    )

}