import { Artwork, Tour as TourType } from "../../app/types";
import { Box, Button, Typography, Paper, Step, StepContent, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { TourCard } from "./TourCard";
import { getPublicTours, getToursForUser } from "../../services/api";
import { useAppSelector } from "../../app/hooks";
import { Redirect } from 'react-router-dom';

export function TourStepper(props: { isPublic: boolean }) {
    const { isPublic } = props;
    const { isLoggedIn } = useAppSelector(state => state.auth);

    let tours;
    if (isPublic) {
        tours = getPublicTours();
    } else {
        tours = getToursForUser();
    }

    const { data } = tours;

    //@todo: block tour if user doesn't have access
    //@todo: add modal to add tour to favorites if user enjoyed it
    
    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const { tourId } = useParams<{ tourId?: string }>();
    const tour = tourId && data?.find(tour => tour.tourId === (parseInt(tourId, 10)));
  
    if (!isLoggedIn) {
        return <Redirect to='/login' />;
    }

    //@todo: add proper loading and error indicators
    if (!tour) {
        return <div>An error occurred</div>;
    }
    return (
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Box sx={{ width: 400, mt: 2, ml: 2 }} >
            <Stepper activeStep={activeStep} orientation="vertical">
                {tour.artworks.map((artwork: Artwork, index: number) => (
                    <Step key={`viewing_artwork_${artwork.artworkId}`}>
                        <StepLabel
                            optional={
                                index === tour.artworks.length - 1 ? (
                                    <Typography variant="caption">Last artwork</Typography>
                                ) : null}
                        >
                            {/* {index + 1} */}
                            {artwork.title}
                        </StepLabel>
                        
                        <StepContent>
                            <Box sx={{ mb: 2 }}>
                            <Paper sx={{ p: 2 }}
                            elevation={1}>
                            <TourCard tourId={tour.tourId} isPublic={isPublic} artwork={artwork} key={`tour_${index}_in_progress_${artwork.title}`} />
                        </Paper>
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 1, mr: 1 }}
                                    disabled={index === tour.artworks.length - 1}
                                >
                                    {/* {index === tour.artworks.length - 1 ? 'Finish' : 'Next'} */}
                                    Next
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
        </Box>
    )
};
