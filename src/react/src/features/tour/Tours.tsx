import { Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPublicTours } from "../../services/api";
import { Tour } from "./Tour";
import { data } from "../../services/tourApi";
export function Tours() {
    const tours = data;
    const error = false;
    const isLoading = false;
    //const { data: tours, error, isLoading } = getPublicTours();
    if (!tours || error) {
        return (<div> An error occured</div>);
    }
    return (
        <Grid container spacing={1} alignContent="center" flexDirection="column" >
            {tours.map((tour, index) => {
                return <Tour key={tour.tourId} tour={tour} />
            })}
        </Grid >
    )
};
