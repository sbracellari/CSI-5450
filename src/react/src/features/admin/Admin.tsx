import { Button, Box } from '@mui/material';
import { getCollection, getUserFavorites, getPublicTours, getToursForUser, getAllLocations } from '../../services/api';

export function Admin(){
    const admin = 'admin1@arttour.com';
    const { data: publictours } = getPublicTours();

    const { data: locations } = getAllLocations();

    const { data: favorites } = getUserFavorites('admin1@arttour.com');

    const { data: tours } = getToursForUser();

    return(
        <Box>
        </Box>
    )
}
