import { Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Tour } from "./Tour";

export function Tours() {
    //@todo: get the actual trour collection
    const { collection, status } = useAppSelector((state) => state.collection);
    const dispatch = useAppDispatch();

    // this will be an array of arrays
    // array of tours including array or artworks

    const tours = [
        { tourId: 1, title: 'Tour title 1', email: '', artworks: collection },
        { tourId: 2, title: 'Tour title 2', email: '', artworks: collection }];

    return (
        <Grid container spacing={1} alignContent="center" flexDirection="column" >
            {tours.map((tour, index) => {
                return <Tour key={tour.tourId} tour={tour} />
            })}
        </Grid >
    )
};
