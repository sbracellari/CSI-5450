import { Artwork } from "../../app/types";
import { Box, Typography, Grid, IconButton, Tooltip, Fab } from "@mui/material";
import { RoomOutlined } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteFromTour } from '../../services/api';
import { useAppDispatch } from "../../app/hooks";
import FavoriteIcon from '@mui/icons-material/Favorite';

interface TourCardProps {
    artwork: Artwork;
    isPublic: boolean;
    tourId: number | null;
}

export function TourCard(props: TourCardProps) {
    const { artwork, isPublic, tourId } = props;

    const [
        deleteArtworkFromTour
    ] = deleteFromTour()

    const handleDelete = (tourId: number | null, artworkId: string) => {
        deleteArtworkFromTour({ tourId, artworkId });
    }

    //@todo: add more details for each card
    const onView = artwork.location.physicalLocation !== 'Not on View';
    const unknown = artwork.location.physicalLocation !== 'Unknown';

    return (
        <Grid >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Typography component="div" variant="h6">
                        {artwork.title}
                    </Typography>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Tooltip title='Favorite artwork' placement='bottom'>
                        <IconButton 
                            // onClick={() => dispatch(favoriteArtwork(artwork.artworkId))} // how to call?
                        >
                            <FavoriteIcon />
                        </IconButton>
                    </Tooltip>
                    {!isPublic && (
                    
                    <Tooltip title='Delete from tour' placement='bottom'>
                        <IconButton 
                            onClick={() => handleDelete(tourId, artwork.artworkId)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    
                   
                )}
                 </Box>
                </Box>
                <Box
                    component="img"
                    sx={{
                        height: 200,
                        width: '100%'
                    }}
                    src={"./art.png"}
                />

            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Box>
                    <Typography variant="subtitle1" color="text.primary" component="div">
                        {artwork.creator.fullName} - {artwork.creationDate}
                    </Typography>
                </Box>
            </Box>
            {(onView && unknown) && 
                <Box component="div" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <RoomOutlined />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="subtitle2" color="text.secondary" component="div">
                                {artwork.location.physicalLocation}
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary" component="div">
                                {artwork.location.department}
                            </Typography>
                        </Box>
                </Box>
            }
        </Box>
    </Grid>
    )
};