import { Artwork } from "../../app/types";
import { Box, Typography, Grid} from "@mui/material";
import { RoomOutlined } from "@mui/icons-material";

interface TourCardProps {
    artwork: Artwork;
}
export function TourCard(props: TourCardProps) {
    const { artwork } = props;
    //@todo: add more details for each card
    const onView = artwork.location.physicalLocation !== 'Not on View';
    const unknown = artwork.location.physicalLocation !== 'Unknown';
    return (
        <Grid >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box
                component="img"
                sx={{
                    height: 200,
                }}
                src={"./art.png"}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            </Box>
            <Typography component="div" variant="h6">
                {artwork.title}
            </Typography>
            <Typography variant="subtitle1" color="text.primary" component="div">
                {artwork.creator.fullName} - {artwork.creationDate}
            </Typography>
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