import { getPublicTours, getToursForUser } from "../../services/api";
import { Box, Grid, CircularProgress } from "@mui/material";
import { data } from "../../services/tourApi";
import { Tour } from "./Tour";
import { useAppSelector } from "../../app/hooks";
export function Tours(props: { isPublic: boolean; }) {
    const { isPublic } = props;
    let tours;

    const publicTours = getPublicTours();
    const personalTours = getToursForUser();

    if (isPublic) {
        tours = publicTours;
    } else {
        tours = personalTours;
    }

    // const { data: tours, isError, isLoading, isFetching } = { data, isLoading: false, isError: false, isFetching: false }

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
        <Grid container spacing={1} alignContent="center" flexDirection="column" >
            {tours.data.map((tour, index) => {
                return <Tour key={tour.tourId} tour={tour} isPublic={isPublic} />
            })}
        </Grid >
    )
};
