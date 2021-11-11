import { Artwork, Tour as TourType } from "../../app/types";
import { Box, IconButton, Typography, Grid} from "@mui/material";
import { PlayCircle, RoomOutlined } from "@mui/icons-material";

interface TourCardProps {
    artwork: Artwork;
}
export function TourCard(props: TourCardProps) {
    const { artwork } = props;
    //@todo: start a tour
    //@todo: need to fix some weird padding betwin the swipe and the text
    const onView = artwork.location.physicalLocation !== 'Not on View';

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
            {onView &&
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