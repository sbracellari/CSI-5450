import { Artwork as ArtworkType } from "../../app/types";
import {
    Box, Button, Card, CardActions, CardContent, CardMedia, Chip, IconButton, Typography, DialogContent,
    DialogActions, DialogTitle, Dialog, RadioGroup, FormLabel, FormControl, Snackbar, FormControlLabel, FormHelperText, Radio, Tooltip
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useAppSelector } from "../../app/hooks";
import { useState } from 'react';
import green from '../../img/img1.jpg';
import orange from '../../img/img2.jpg';
import purple from '../../img/img3.jpg';

import { useAddToTourMutation, useFavoriteArtworkMutation, useDeleteFavoriteArtworkMutation, useGetUserFavoritesQuery, useGetToursForUserQuery } from '../../services/api';
interface ArtworkProps {
    artwork: ArtworkType;
}


export function Artwork(props: ArtworkProps) {
    const { artwork } = props;
    const { isLoggedIn } = useAppSelector(state => state.auth);

    const images = [orange, purple, green];

    const [open, setOpen] = useState(false);
    const [tourId, setTourId] = useState(0);
    const { data: tours } = useGetToursForUserQuery();

    const [
        addArtworkToTour
    ] = useAddToTourMutation()

    const handleSubmit = (tourId: number, artworkId: string) => {
        setOpen(false);
        setTourId(0);
        addArtworkToTour({ tourId, artworkId });
    };

    const artworkInTour = (tourId: number | null, artworkId: string) => {
        const tour = tours?.find(tour => tour.tourId === tourId);
        const artwork = tour?.artworks.find(artwork => artwork.artworkId === artworkId);
        return artwork ? true : false;
    }

    return (
        <>
            <Card variant="elevation" sx={{ pb: 2, maxWidth: 400 }}>
                <CardMedia
                    component="img"
                    sx={{ width: '100%', height: 175 }}
                    image={images[Math.floor(Math.random() * 3)]}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent >
                        <Typography component="div" variant="h6" display='inline'>
                            {artwork.title}
                        </Typography>
                        {artwork.creationDate &&
                            <Typography variant="body2" color="text.secondary" component="div" display='inline'>
                                , {artwork.creationDate}
                            </Typography>}
                        <Typography variant="subtitle1" component="div">
                            {artwork.creator.fullName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" component="div">
                            {artwork.creator.nationality}
                            {(artwork.creator.birthDate && artwork.creator.deathDate) ?
                                `, ${artwork.creator.birthDate} - ${artwork.creator.deathDate}` :
                                (artwork.creator.birthDate ? `, ${artwork.creator.birthDate}` : (artwork.creator.deathDate ? `, ${artwork.creator.deathDate}` : ''))}
                        </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', pl: 1, pb: 1, gap: 2 }}>
                        {artwork.medium && <Chip color="info" label={artwork.medium} sx={{maxWidth: '98%'}} />}
                        {artwork.classification && <Chip color="secondary" label={artwork.classification} sx={{maxWidth: '98%'}} />}
                    </Box>
                </Box>
                {isLoggedIn &&
                    <CardActions>
                        {FavoriteButton(artwork)}
                        <Button onClick={() => setOpen(true)} size="small" aria-label="add to tour">Add to tour</Button>
                    </CardActions>}
            </Card>

            <Dialog onClose={() => setOpen(false)} open={open}>
                <DialogTitle>Choose Tour</DialogTitle>
                <DialogContent>
                    {tours?.length === 0 ? <Typography>You don't have any tours yet. Go to "My Tours" to add one.</Typography> :
                        <FormControl component="fieldset">
                            <FormLabel sx={{ mb: 1 }} component="legend">Choose which tour you'd like to add this artwork to</FormLabel>
                            <RadioGroup
                                value={tourId}
                                onChange={event => setTourId(parseInt(event.target.value))}
                            >
                                {tours?.map(tour => (
                                    <>
                                        <FormControlLabel value={tour.tourId} control={<Radio />} label={tour.tourName?.replace(/['"]+/g, '')} disabled={artworkInTour(tour.tourId, artwork.artworkId)} />
                                        {artworkInTour(tour.tourId, artwork.artworkId) &&
                                            <FormHelperText>Artwork is already in this tour.</FormHelperText>
                                        }
                                    </>
                                ))}
                            </RadioGroup>
                        </FormControl>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button disabled={tourId === 0} onClick={() => handleSubmit(tourId, artwork.artworkId)}>Add</Button>
                </DialogActions>
            </Dialog>

        </>
    )
};

export const FavoriteButton = (artwork: ArtworkType) => {

    const [
        addFavArtwork,
        {
            isSuccess: addedFavArtwork,
            isError: errorAddingFavArtwork
        }
    ] = useFavoriteArtworkMutation();
    const [
        deleteFavArtwork,
        {
            isSuccess: deletedFavArtwork,
            isError: errorDeletingFavArtwork
        }
    ] = useDeleteFavoriteArtworkMutation();
    const [alert, setAlert] = useState(false);

    const handleClose = () => {
        setAlert(false);
    };
    const { data: favorites } = useGetUserFavoritesQuery({ skipToken: true });
    let message;
    const isFavorite = favorites?.favoriteArtworks.find((item: ArtworkType) => item.artworkId === artwork.artworkId);
    if (addedFavArtwork) {
        message = "Artwork added to favorites.";
    }
    if (errorAddingFavArtwork) {
        message = "An error occured when adding a favorite an artwork.";
    }
    if (deletedFavArtwork) {
        message = "Artwork deleted from favorites.";
    }
    if (errorDeletingFavArtwork) {
        message = "An error occured when deleting an artwork from favorites.";
    }
    return (
        <>
            {isFavorite ? (
                <Tooltip title='Unavorite artwork' placement='bottom'>
                    <IconButton aria-label="add to favorites" onClick={() => deleteFavArtwork(artwork.artworkId)}>
                        <FavoriteIcon color="error" />
                    </IconButton>
                </Tooltip>)
                :
                (<Tooltip title='Favorite artwork' placement='bottom'>
                    <IconButton aria-label="add to favorites" onClick={() => addFavArtwork(artwork.artworkId)}>
                        <FavoriteBorderIcon />
                    </IconButton>
                </Tooltip>
                )}
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={alert}
                onClose={handleClose}
                message={message}
            />
        </>
    );

}
