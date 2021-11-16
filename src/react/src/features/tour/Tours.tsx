import { getPublicTours, getToursForUser } from "../../services/api";
import { Box, Grid, CircularProgress, Typography, Tooltip } from "@mui/material";
import { data } from "../../services/tourApi";
import { Tour } from "./Tour";
import { useAppSelector } from "../../app/hooks";
import { Tour as TourType } from "../../app/types";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


export function Tours(props: { isPublic: boolean, tours: any }) {
    const { isPublic, tours } = props;
    const { data, isError, isLoading, isFetching } = tours

    if (isFetching || isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>);
    }
    if (!data || isError) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                An error occurred.
            </Box>);
    }
    if(data.length === 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                No tours to display.
            </Box>);
    }
    return (
        <>
            <Grid container spacing={1} alignContent="center" flexDirection="column" >
                {data.map((tour: TourType, index: any) => {
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
