import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ListItemButton from '@mui/material/ListItemButton';
import CollectionsIcon from '@mui/icons-material/Collections';
import TourIcon from '@mui/icons-material/Tour';
import PublicIcon from '@mui/icons-material/Public';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { logout } from './auth/authSlice';

export function MobileDrawer() {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
  
    const list = () => (
      <Box
        sx={{ width: 'auto' }}
        role="presentation"
        onClick={() => setOpen(false)}
        onKeyDown={() => setOpen(false)}
      >
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    );
  
    return (
      <div >
          <React.Fragment>
            <IconButton onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor='left'
              open={open}
              onClose={() => setOpen(false)}
            >
              <Box
                sx={{ width: '250px', height: '100%', bgcolor: '#fafafa', display: 'inline-grid'}}
                role="presentation"
                onClick={() => setOpen(false)}
                onKeyDown={() => setOpen(false)}
              >
                <List>
                  <ListItemButton component={Link} to='/collection'>
                    <ListItemIcon>
                      <CollectionsIcon />
                    </ListItemIcon>
                    <ListItemText primary='Collection' />
                  </ListItemButton>
                  <ListItem>
                    <ListItemIcon>
                      <TourIcon />
                    </ListItemIcon>
                    <ListItemText primary='Tours' />
                  </ListItem>
                  <List>
                    <ListItemButton sx={{pl: 4}} component={Link} to='/public-tours'>
                      <ListItemIcon>
                        <PublicIcon />
                      </ListItemIcon>
                      <ListItemText primary='Public Tours' />
                    </ListItemButton>
                    <ListItemButton sx={{pl: 4}} component={Link} to='/my-tours' >
                      <ListItemIcon>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText primary='My Tours' />
                    </ListItemButton>
                  </List>
                  <ListItemButton component={Link} to='/favorites'>
                    <ListItemIcon>
                      <FavoriteIcon />
                    </ListItemIcon>
                    <ListItemText primary='Favorites' />
                  </ListItemButton>
                </List>
                <List sx={{mt: 'auto', display: 'table-cell'}}>
                  <ListItemButton component={Link} to='/account'>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary='My Account' />
                  </ListItemButton>
                  <ListItemButton onClick={() => dispatch(logout())} component={Link} to='/login'>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary='Logout' />
                  </ListItemButton>
                </List>
              </Box>
            </Drawer>
          </React.Fragment>
      </div>
    );
  }