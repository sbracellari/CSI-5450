import { getUserFavorites } from "../../services/api";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Artwork } from "../collection/Artwork";
import { Tour } from "../tour/Tour";
import { Creator } from "../collection/Creator";
import { Artwork as ArtworkType, Tour as TourType, Creator as CreatorType } from "../../app/types";

export function Favorites() {
    const { data, isError, isLoading, isFetching } = getUserFavorites({ skipToken: true });

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
        <Box>
            {favoriteArtworks.length !== 0 &&
                <>
                    <Typography>Favorite artworks</Typography>
                    {favoriteArtworks.map((artwork: ArtworkType) => <Artwork artwork={artwork} />)}
                </>
            }
            {favoriteCreators.length !== 0 &&
                <>
                    <Typography>Favorite creators</Typography>
                    {favoriteCreators.map((creator: CreatorType) => <Creator creator={creator} />)}
                </>
            }
            {favoriteTours.length !== 0 &&
                <>
                    <Typography>Favorite tours</Typography>
                    {favoriteTours.map((tour: TourType) => <Tour tour={tour} isPublic={false} />)}
                </>
            }
        </Box>);

};
