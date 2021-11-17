import { Artwork as ArtworkType } from "../../app/types";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, IconButton, Typography, DialogContent,
    ListItemIcon, ListItemButton, DialogActions
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link, Redirect } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Tour } from '../../app/types';
import { addToTour, getToursForUser } from '../../services/api';

interface ArtworkProps {
    artwork: ArtworkType;
}

export function Artwork(props: ArtworkProps) {
    const { artwork } = props;
    const dispatch = useAppDispatch();
    const { isLoggedIn } = useAppSelector(state => state.auth); 
    const handleFavorite = (artworkId: string) => {
        //@todo: check user artwork favorites and filter throwgh them 
        console.log('handle favorites');
    }

    const [open, setOpen] = useState(false);
    const [tourId, setTourId] = useState(0);
    const { data: tours } = getToursForUser();

    const handleSubmit = (tourId: number, artworkId: string) => {
        setOpen(false);
        console.log(tourId)
        // dispatch(addToTour({ tourId, artworkId }));
    };

    if (!isLoggedIn) {
        return <Redirect to='/login' />;
    } 

    return (
        <>
        <Card variant="elevation" sx={{ pb: 2, maxWidth: 400 }}>
            <CardMedia
                component="img"
                sx={{ width: 200 }}
                image="../../../public/logo512.png"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent >
                    <Typography component="div" variant="h6" display='inline'>
                        {`${artwork.title}, `}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="div" display='inline'>
                        {artwork.creationDate}
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                        {artwork.creator.fullName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="div">
                        {artwork.creator.nationality}, {artwork.creator.birthDate} - {artwork.creator.deathDate}
                    </Typography>

                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', pl: 1, pb: 1, gap: 2 }}>
                    {artwork.medium && <Chip color="info" label={artwork.medium} />}
                    {artwork.classification && <Chip color="secondary" label={artwork.classification} />}
                </Box>
            </Box>
            <CardActions>
                {isLoggedIn && <IconButton aria-label="add to favorites" onClick={() => handleFavorite(artwork.artworkId)}>
                    <FavoriteIcon />
                </IconButton>}
                <Button size="small" aria-label="view details"
                    component={Link} to={`/details?id=${artwork.artworkId}`}
                    onClick={() => console.log('view detail')}
                >Details</Button>
                <Button onClick={() => setOpen(true)} size="small" aria-label="add to tour">Add to tour</Button>
            </CardActions>
        </Card>

        <Dialog onClose={() => setOpen(false)} open={open}>
            <DialogTitle>Choose Tour</DialogTitle>
            <DialogContent>
                <FormControl component="fieldset">
                    <FormLabel sx={{mb: 1}} component="legend">Choose which tour you'd like to add this artwork to</FormLabel>
                    <RadioGroup
                        value={tourId}
                        onChange={event => setTourId(parseInt(event.target.value))}
                    >
                        {tours?.map(tour => (
                            <FormControlLabel value={tour.tourId} control={<Radio />} label={tour.tourName} />
                        ))}
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button disabled={tourId === 0} onClick={() => handleSubmit(tourId, artwork.artworkId)}>Add</Button>
            </DialogActions>
        </Dialog>

        </>
    )
};
