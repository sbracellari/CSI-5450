import { Creator as CreatorType } from "../../app/types";
import {
    Box, Button, Card, CardActions, CardContent, CardMedia, Chip, IconButton, Typography, DialogContent,
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';

export function Creator(props: { creator: CreatorType }) {
    const { creator } = props;
    const isLoggedIn = true;//@todo: get user 
    const handleFavorite = (artworkId: number | null) => {
        //@todo: check user artwork favorites and filter throwgh them 
        console.log('handle favorites');
    }

    return (
        <>
            <Card variant="elevation" sx={{ pb: 2, maxWidth: 400, display: 'flex', flexDirection: 'column' }}>
                <CardContent >
                    <Typography variant="subtitle1" component="div">
                        {creator.fullName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="div">
                        {creator.nationality}, {creator.birthDate} - {creator.deathDate}
                    </Typography>

                </CardContent>
                <CardActions>
                    {isLoggedIn && <IconButton aria-label="add to favorites" onClick={() => handleFavorite(creator.creatorId)}>
                        <FavoriteIcon />
                    </IconButton>}
                </CardActions>
            </Card>
        </>
    )
};
