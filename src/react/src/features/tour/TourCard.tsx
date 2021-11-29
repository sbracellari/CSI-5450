import { Artwork } from "../../app/types";
import { Box, Typography, Grid } from "@mui/material";
import { FavoriteButton } from "../collection/Artwork";
import { useAppSelector } from "../../app/hooks";

interface TourCardProps {
    artwork: Artwork;
    isPublic: boolean;
    tourId: number | null;
}

export function TourCard(props: TourCardProps) {
    const { artwork, isPublic, tourId } = props;
    const { isLoggedIn } = useAppSelector(state => state.auth);
    const onView = artwork.location.physicalLocation === 'Not on View';
    const unknown = artwork.location.physicalLocation === 'Unknown';
    if (onView || unknown) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography component="div" variant="body1" display='inline'>
                    {`${artwork.title} is not currently on display.`}
                </Typography>
            </Box>
        )
    }
    return (
        <Grid>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography component="div" variant="h6" display='inline'>
                            {artwork.title}
                        </Typography>
                        {artwork.creationDate &&
                            <Typography variant="body2" color="text.secondary" component="div" display='inline'>
                                , {artwork.creationDate}
                            </Typography>}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {isLoggedIn && FavoriteButton(artwork)}
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
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" color="text.primary" component="div"  >
                        About the artwork
                    </Typography>
                    <Box>
                        {artwork.classification &&
                            <Box>
                                <Typography variant="body2" color="text.secondary" component="div" display='inline'>
                                    Classification:
                                </Typography>
                                <Typography variant="subtitle1" color="text.primary" component="div" display='inline'>
                                    {` ${artwork.classification}`}
                                </Typography></Box>}
                        {artwork.medium &&
                            <Box>
                                <Typography variant="body2" color="text.secondary" component="div" display='inline'>
                                    Medium:
                                </Typography>
                                <Typography variant="subtitle1" color="text.primary" component="div" display='inline'>
                                    {` ${artwork.medium}`}
                                </Typography>
                            </Box>
                        }
                        {artwork.dateAcquired &&
                            <Box>
                                <Typography variant="body2" color="text.secondary" component="div" display='inline'>
                                    Date acquired:
                                </Typography>
                                <Typography variant="body1" color="text.primary" component="div" display='inline'>
                                    {` ${artwork.dateAcquired}`}
                                </Typography>
                            </Box>
                        }
                        {artwork.provenanceText &&
                            <Box>
                                <Typography variant="body2" color="text.secondary" component="div" display='inline'>
                                    Provenance:
                                </Typography>
                                <Typography variant="body2" color="text.primary" component="div" display='inline'>
                                    {` ${artwork.provenanceText}`}
                                </Typography>
                            </Box>}
                    </Box>
                    <Box>
                        <Typography variant="h6" color="text.primary" component="div" >
                            About the artist
                        </Typography>
                        <Typography variant="body2" color="text.primary" component="div" >
                            {artwork.creator.fullName}
                            {artwork.creator.birthDate && ` was born on ${artwork.creator.birthDate}`}
                            {artwork.creator.birthPlace && ` in ${artwork.creator.birthPlace}`}
                            {(artwork.creator.birthDate || artwork.creator.birthPlace) && '.'}
                            {(artwork.creator.deathDate || artwork.creator.deathPlace) && ` ${artwork.creator.fullName}` &&
                                (artwork.creator.deathDate && ` died on ${artwork.creator.deathDate}`) &&
                                (artwork.creator.deathPlace && ` in ${artwork.creator.deathPlace}`) &&
                                (artwork.creator.role && ` ${artwork.creator.fullName} is known fot their role of ${artwork.creator.role}`) &&
                                '.'}
                        </Typography>
                    </Box>
                    {artwork.creditLine &&
                        <Typography variant="caption" color="text.secondary" component="div" >
                            {artwork.creditLine ? artwork.creditLine : 'Unknown'}
                        </Typography>}
                </Box>

            </Box>
        </Grid>
    )
};