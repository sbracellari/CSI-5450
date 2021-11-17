import { getPublicTours, getToursForUser } from "../../services/api";
import { Box, Grid, CircularProgress, Typography, Tooltip } from "@mui/material";
import { data } from "../../services/tourApi";
import { Tour } from "./Tour";
import { useAppSelector } from "../../app/hooks";
import { Tour as TourType } from "../../app/types";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Redirect } from 'react-router-dom';


export function Tours(props: { isPublic: boolean }) {
    const { isPublic } = props;
    const { isLoggedIn } = useAppSelector(state => state.auth);

    let tours;
    if (isPublic) {
        tours = getPublicTours();
    } else {
        tours = getToursForUser();
    }    

    if (!isLoggedIn) {
        return <Redirect to='/login' />;
    }

    if (tours.isFetching || tours.isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>);
    }
    if (!tours.data || tours.isError) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                An error occurred.
            </Box>);
    }
    if(tours.data.length === 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                No tours to display.
            </Box>);
    }
    return (
        <>
            <Grid container spacing={1} alignContent="center" flexDirection="column" >
                {tours.data.map((tour: TourType, index: any) => {
                    return <Tour key={tour.tourId} tour={tour} isPublic={isPublic} />
                })}
            </Grid >
            {!isPublic && (
                <Tooltip title='Create new tour' placement='left'>
                    <Fab size='small' color="primary" aria-label="add" sx={{position: 'fixed', right: 15, bottom: 15}}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
            )}
        </>
    )
};
