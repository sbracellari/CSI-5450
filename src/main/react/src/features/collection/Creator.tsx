import { Creator as CreatorType } from "../../app/types";
import {
    Card, CardActions, CardContent, IconButton, Typography,
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAppSelector } from "../../app/hooks";

export function Creator(props: { creator: CreatorType }) {
    const { creator } = props;
    const { isLoggedIn } = useAppSelector(state => state.auth);
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
                        {creator.nationality}
                    </Typography>
                    <Typography variant="body2" color="text.primary" component="div" >
                        {creator.fullName}
                        {creator.birthDate && ` was born on ${creator.birthDate}`}
                        {creator.birthPlace && ` in ${creator.birthPlace}`}
                        {(creator.birthDate || creator.birthPlace) && '.'}
                        {(creator.deathDate || creator.deathPlace) && ` ${creator.fullName}` &&
                            (creator.deathDate && ` died on ${creator.deathDate}`) &&
                            (creator.deathPlace && ` in ${creator.deathPlace}`) &&
                            (creator.role && ` ${creator.fullName} is known fot their role of ${creator.role}`) &&
                            '.'}
                    </Typography>
                </CardContent>
                <CardActions>
                    {isLoggedIn && <IconButton aria-label="add to favorites" onClick={() => handleFavorite(creator.creatorId)}>
                        <FavoriteIcon color="error" />
                    </IconButton>}
                </CardActions>
            </Card>
        </>
    )
};
