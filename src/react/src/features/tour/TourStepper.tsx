import { Artwork } from "../../app/types";
import { Box, Button, Typography, Paper, Step, StepContent, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { TourCard } from "./TourCard";
import { useGetPublicToursQuery, useGetToursForUserQuery } from "../../services/api";
import { useAppSelector } from "../../app/hooks";
import { Redirect } from 'react-router-dom';

export function TourStepper(props: { isPublic: boolean }) {
    const { isPublic } = props;
    const { isLoggedIn } = useAppSelector(state => state.auth);
    const publicTours = useGetPublicToursQuery();
    const personalTours = useGetToursForUserQuery();
    let tours;
    if (isPublic) {
        tours = publicTours;
    } else {
        tours = personalTours;
    }
    const { data } = tours;
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

    if (!isLoggedIn && !isPublic) {
        return <Redirect to='/login' />;
    }

    //@todo: add proper loading and error indicators
    if (!tour) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                An error occurred.
            </Box>);
    }
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: 400, mt: 2, ml: 2 }} >
                <Stepper activeStep={activeStep} orientation="vertical">
                    {tour.artworks.map((artwork: Artwork, index: number) => {
                        const onView = artwork.location.physicalLocation !== 'Not on View';
                        const unknown = artwork.location.physicalLocation !== 'Unknown';

                        return (
                            <Step key={`viewing_artwork_${artwork.artworkId}`}>
                                <StepLabel
                                    optional={
                                        index === tour.artworks.length - 1 ? (
                                            <Typography variant="caption">Last artwork</Typography>
                                        ) : null}
                                >
                                    {/* {index + 1} */}
                                    {artwork.title}
                                    {(onView && unknown) &&
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <Typography variant="subtitle2" color="text.secondary" component="div">
                                                {artwork.location.physicalLocation}
                                            </Typography>
                                            <Typography variant="subtitle2" color="text.secondary" component="div">
                                                {artwork.location.department}
                                            </Typography>
                                        </Box>
                                    }
                                </StepLabel>

                                <StepContent>
                                    <Box sx={{ mb: 2 }}>
                                        <Paper sx={{ p: 2 }}
                                            elevation={1}>
                                            <TourCard tourId={tour.tourId} isPublic={isPublic} artwork={artwork} key={`tour_${index}_in_progress_${artwork.title}`} />
                                        </Paper>
                                        {index === tour.artworks.length - 1 ?
                                            (<Button
                                                variant="contained"
                                                sx={{ mt: 1, mr: 1 }}
                                                component={Link} to={isPublic ? '/public-tours' : 'my-tours'}
                                            >Finish</Button>) :
                                            (<Button
                                                variant="contained"
                                                onClick={handleNext}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                Next
                                            </Button>)}
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
                        )
                    })}
                </Stepper>
            </Box>
        </Box>
    )
};
