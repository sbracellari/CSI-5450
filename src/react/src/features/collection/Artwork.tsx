import { Artwork as ArtworkType } from "../../app/types";
import {
    Box, Button, Card, CardActions, CardContent, CardMedia, Chip, IconButton, Typography, DialogContent,
    DialogActions, DialogTitle, Dialog, RadioGroup, FormLabel, FormControl
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';
import { useAppDispatch } from "../../app/hooks";
import React, { useState } from 'react';
import { Tour } from '../../app/types';
import { addToTour, favoriteArtwork, deleteFavoriteArtwork, getUserFavorites } from '../../services/api';

export function Artwork(props: { artwork: ArtworkType }) {
    const { artwork } = props;
    const dispatch = useAppDispatch();
    const isLoggedIn = true;//@todo: get user 
    const [
        addFavorite,
    ] = favoriteArtwork()
    const [
        deleteFavorite,
    ] = deleteFavoriteArtwork()

    const { data: favorites } = getUserFavorites({ skipToken: true });

    const handleFavorite = (artworkId: string) => {
        const isFavorite = favorites?.favoriteArtworks.find((item: ArtworkType) => item.artworkId === artworkId);
        return isFavorite ? (
            <IconButton aria-label="add to favorites" onClick={() => deleteFavorite(artwork.artworkId)}>
                <FavoriteIcon />
            </IconButton>)
            :
            (<IconButton aria-label="add to favorites" onClick={() => addFavorite(artwork.artworkId)}>
                <FavoriteBorderIcon />
            </IconButton>);

    }
    const [open, setOpen] = useState(false);
    const [tourId, setTourId] = useState(0);

    const handleSubmit = (tourId: number, artworkId: string) => {
        setOpen(false);
        console.log(tourId)
        // dispatch(addToTour, addTo({ tourId, artworkId }));
    };

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
                    {isLoggedIn && handleFavorite(artwork.artworkId)}
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
                        <FormLabel sx={{ mb: 1 }} component="legend">Choose which tour you'd like to add this artwork to</FormLabel>
                        <RadioGroup
                            value={tourId}
                            onChange={event => setTourId(parseInt(event.target.value))}
                        >
                            {/* {tours?.map(tour => (
                                <FormControlLabel value={tour.tourId} control={<Radio />} label={tour.tourName} />
                            ))} */}
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
