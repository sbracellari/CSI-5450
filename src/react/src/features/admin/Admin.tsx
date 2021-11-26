import { Button, Box } from '@mui/material';
import { useGetCollectionQuery, useGetPublicToursQuery, useGetToursForUserQuery, useGetAllLocationsQuery } from '../../services/api';

export function Admin(){
    const admin = 'admin1@arttour.com';
    const { data: publictours } = useGetPublicToursQuery();
    const { data: locations } = useGetAllLocationsQuery();
    const { data: tours } = useGetToursForUserQuery();

    return(
        <Box>
        </Box>
    )
}
