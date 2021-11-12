import { Artwork as ArtworkType } from "../../app/types";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, IconButton, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { useAppDispatch } from "../../app/hooks";
interface ArtworkProps {
    artwork: ArtworkType;
}

export function Artwork(props: ArtworkProps) {
    const { artwork } = props;
    const dispatch = useAppDispatch();
    const isLoggedIn = true;//@todo: get user 
    const handleFavorite = (artworkId: string) => {
        //@todo: check user artwork favorites and filter throwgh them 
        console.log('handle favorites');
    }
    return (
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
                <Button size="small" aria-label="add to tour" >Add to tour</Button>
            </CardActions>
        </Card>
    )
};
