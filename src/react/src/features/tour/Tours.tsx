import { getPublicTours } from "../../services/api";
import { Box, Grid, CircularProgress } from "@mui/material";
import { data } from "../../services/tourApi";
import { Tour } from "./Tour";
export function Tours() {
    //const { data: tours, isError, isLoading, isFetching } = getPublicTours();
    const { data: tours, isError, isLoading, isFetching } = { data, isLoading: false, isError: false, isFetching: false }

    if (isFetching || isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>);
    }
    if (!tours || isError) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                An error occured.
            </Box>);
    }
    return (
        <Grid container spacing={1} alignContent="center" flexDirection="column" >
            {tours.map((tour, index) => {
                return <Tour key={tour.tourId} tour={tour} />
            })}
        </Grid >
    )
};
