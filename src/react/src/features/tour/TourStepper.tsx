import { Tour as TourType } from "../../app/types";
import { Box, Button, Typography, Paper, Step, StepContent, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import { Tour } from "./Tour";
import { useParams } from "react-router-dom";
interface TourProps {
    tour: TourType;
}
export function TourStepper() {
    //@todo: start a tour
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: any) => {
        setActiveStep(step);
    };
    let params = useParams();

    //@todo: need to fix some weird padding betwin the swipe and the text
    return (
        <Box sx={{ maxWidth: 400, mt: 2 }} >
            <Stepper activeStep={activeStep} orientation="vertical">
                {tour.artworks.map((artwork, index) => (
                    <Step key={`viewing_artwork_${artwork.artworkId}`}>
                        <StepLabel
                            optional={
                                index === tour.artworks.length - 1 ? (
                                    <Typography variant="caption">Last artwork</Typography>
                                ) : null
                            }
                        >
                            {index + 1}
                        </StepLabel>
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
            <Paper
                sx={{
                    p: 2,
                }}
                elevation={1}>
                {/* {tour.artworks.map((artwork, index) => {
                        const onView = artwork.location.physicalLocation !== 'Not on View';
                        return (
                            <TourCard artwork={artwork} key={`tour_${index}_in_progress_${artwork.title}`} />
                        )
                    })} */}
            </Paper>
        </Box>
    )
};
