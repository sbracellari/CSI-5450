import { Tour as TourType } from "../../app/types";
import { Box, Button, Typography, Paper, Step, StepContent, StepLabel, Stepper, Grid } from "@mui/material";
import { useState } from "react";
import { Tour } from "./Tour";
import { useParams } from "react-router-dom";
import { data } from "../../services/tourApi";
import { TourCard } from "./TourCard";

interface TourProps {
    tour: TourType;
}
export function TourStepper(props: TourProps) {
    //@todo: block tour if user doesn't have access
    //@todo: add modal to add tour to favorites if user enjoyed it
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const params = useParams();
    const { tourId } = useParams<{ tourId?: string }>();
    const tours = data;
    const tour = tourId && tours.find(tour => tour.tourId === (parseInt(tourId, 10)));
    console.log(tours, tourId);
    if (!tour) {
        return <div>An error occured</div>;
    }
    return (
        <Box sx={{ maxWidth: 400, mt: 2, display: 'flex', alignContent: "center" }} >
            <Stepper activeStep={activeStep} orientation="vertical">
                {tour.artworks.map((artwork, index) => (
                    <Step key={`viewing_artwork_${artwork.artworkId}`}>
                        <StepLabel
                            optional={
                                index === tour.artworks.length - 1 ? (
                                    <Typography variant="caption">Last artwork</Typography>
                                ) : null}
                        >
                            {index + 1}
                        </StepLabel>
                        <Paper sx={{ p: 2, maxWidth: 400 }}
                            elevation={1}>
                            <TourCard artwork={artwork} key={`tour_${index}_in_progress_${artwork.title}`} />
                        </Paper>
                        <StepContent>
                            <Box sx={{ mb: 2 }}>
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    {index === tour.artworks.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                                <Button
                                    disabled={index === 0}
                                    onClick={handleBack}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Back
                                </Button>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Box>
    )
};
