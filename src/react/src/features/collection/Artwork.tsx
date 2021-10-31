import { Artwork as ArtworkType } from "./collectionSlice";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, IconButton, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { view } from './detailSlice';
import { useAppDispatch } from "../../app/hooks";
interface ArtworkProps {
    artwork: ArtworkType;
}

export function Artwork(props: ArtworkProps) {
    const { artwork } = props;
    const dispatch = useAppDispatch();
    return (
        <Card variant="outlined" sx={{ pb: 2 }}>
            <CardMedia
                component="img"
                sx={{ width: 200 }}
                image="../../../public/logo512.png"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent >
                    <Typography component="div" variant="h6">
                        {artwork.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {artwork.creator.fullName} - {artwork.creationDate}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, gap: 2 }}>
                    <Chip color="info" label={artwork.medium} />
                    <Chip color="secondary" label={artwork.classification} />
                </Box>
            </Box>
            <CardActions>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <Button size="small" aria-label="view details"
                    component={Link} to={`/details?id=${artwork.id}`}
                    onClick={() => dispatch(view(artwork))}
                >Details</Button>
                <Button size="small" aria-label="add to tour" >Add to tour</Button>
            </CardActions>
        </Card>
    )
};
