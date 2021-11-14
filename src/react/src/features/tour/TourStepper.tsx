import { Tour as TourType } from "../../app/types";
import { Box, Button, Typography, Paper, Step, StepContent, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { data } from "../../services/tourApi";
import { TourCard } from "./TourCard";
import { getPublicTours } from "../../services/api";

export function TourStepper() {
    //@todo: block tour if user doesn't have access
    //@todo: add modal to add tour to favorites if user enjoyed it
    //@todo: check if user is logged ina and add the other tours as well
    const { data: tours, isLoading, isError, error, isSuccess } = getPublicTours();
    
    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const { tourId } = useParams<{ tourId?: string }>();
    const tour = tourId && tours?.find(tour => tour.tourId === (parseInt(tourId, 10)));
  
    //@todo: add proper loading and error indicators
    if (!tour) {
        return <div>An error occured</div>;
    }
    return (
        <Box sx={{ maxWidth: 400, mt: 2, ml: 2 }} >
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
