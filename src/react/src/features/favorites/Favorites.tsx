import { useGetUserFavoritesQuery } from "../../services/api";
import { Box, CircularProgress, Typography, Grid, Chip, Divider } from "@mui/material";
import { Artwork } from "../collection/Artwork";
import { Tour } from "../tour/Tour";
import { Creator } from "../collection/Creator";
import { Artwork as ArtworkType, Tour as TourType, Creator as CreatorType } from "../../app/types";
import { Redirect } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

export function Favorites() {
    const { data, isError, isLoading, isFetching } = useGetUserFavoritesQuery({ skipToken: true });
    const { isLoggedIn, isAdmin } = useAppSelector(state => state.auth);
    if (!isLoggedIn) {
        <Redirect to='/login' />;
    }
    if (isFetching || isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>);
    }
    if (!data || isError || (!data.favoriteArtworks && !data.favoriteCreators && !data.favoriteTours)) {

        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                An error occurred.
            </Box>);
    }
    const { favoriteArtworks, favoriteCreators, favoriteTours } = data;

    if (favoriteArtworks?.length === 0 && favoriteCreators?.length === 0 && favoriteTours?.length === 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                No favorites to display.
            </Box>);
    }
    return (
        <Box sx={{ mt: 2 }}>
            {favoriteArtworks.length !== 0 &&
                <Grid container spacing={1} sx={{ display: 'flex', alignContent: 'center', flexDirection: "column", mb: 2 }}>
                    <Divider>
                        <Typography gutterBottom variant="h6" component="div">
                            Favorite Artworks
                        </Typography>
                    </Divider>
                    {favoriteArtworks.map((artwork: ArtworkType) => <Grid key={artwork.artworkId} item><Artwork artwork={artwork} /></Grid>)}
                </Grid>
            }
            {favoriteCreators.length !== 0 &&
                <Grid container spacing={1} sx={{ display: 'flex', alignContent: 'center', flexDirection: "column", mb: 2 }}>
                    <Divider>
                        <Typography gutterBottom variant="h6" component="div">
                            Favorite Creators
                        </Typography>
                    </Divider>
                    {favoriteCreators.map((creator: CreatorType) => <Grid key={creator.creatorId} item><Creator creator={creator} /></Grid>)}
                </Grid >
            }
            {favoriteTours.length !== 0 &&
                <Grid container spacing={1} sx={{ display: 'flex', alignContent: 'center', flexDirection: "column", mb: 2 }}>
                    <Divider>
                        <Typography gutterBottom variant="h6" component="div">
                            Favorite Tours
                        </Typography>
                    </Divider>
                    {favoriteTours.map((tour: TourType) => {
                        const isPublic = tour.email === 'admin2@arttour.com' || tour.email === 'admin1@arttour.com'
                        return (<Grid key={tour.tourId} item><Tour tour={tour} isPublic={isPublic} /></Grid>)
                    })}
                </Grid>
            }
        </Box>);
};
