import { Tour as TourType } from "../../app/types";
import { Box, Button, Menu, MenuItem, IconButton, Typography, Grid, MobileStepper, Paper } from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import { useState } from "react";
import SwipeableViews from 'react-swipeable-views';
import { PlayCircle, KeyboardArrowLeft, KeyboardArrowRight, RoomOutlined, MoreVert, PhotoLibraryOutlined } from "@mui/icons-material";
import { Link, useHistory } from "react-router-dom";

interface TourProps {
    tour: TourType;
}
export function Tour(props: TourProps) {
    const { tour } = props;
    const dispatch = useAppDispatch();
    //@todo: start a tour
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = 5;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: any) => {
        setActiveStep(step);
    };
    const history = useHistory();
    const handleRouting = () => history.push(`/tour/tourId=${tour.tourId}`);

    //@todo: need to fix some weird padding betwin the swipe and the text
    return (
        <Box sx={{ maxWidth: 400, mt: 2 }} >
            <Paper
                sx={{
                    p: 2,
                }}
                elevation={1}>
                <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography component="div" variant="h6" >
                        {tour.title}
                    </Typography>
                    {DropdownButton()}
                </Box>
                <Box component="div" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <PhotoLibraryOutlined />
                    <Typography component="div" variant="subtitle1" ml={1}>
                        {tour.artworks.length}
                    </Typography>
                </Box>
                <SwipeableViews
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents>
                    {tour.artworks.map((artwork, index) => {
                        const onView = artwork.location.physicalLocation !== 'Not on View';
                        return (
                            <Grid key={`tour_${index}_${artwork.title}`}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Box
                                        component="img"
                                        sx={{
                                            height: 200,
                                        }}
                                        src={"./art.png"}
                                    />
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <IconButton component={Link} to={`/tour/tourId/${tour.tourId}`}
                                            onClick={() => handleRouting()/*dispatch(view(artwork))*/}>
                                            <PlayCircle />

                                        </IconButton>
                                    </Box>
                                    <Typography component="div" variant="h6">
                                        {artwork.title}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.primary" component="div">
                                        {artwork.creator.fullName} - {artwork.creationDate}
                                    </Typography>
                                    {onView &&
                                        <Box component="div" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <RoomOutlined />
                                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                <Typography variant="subtitle2" color="text.secondary" component="div">
                                                    {artwork.location.physicalLocation}
                                                </Typography>
                                                <Typography variant="subtitle2" color="text.secondary" component="div">
                                                    {artwork.location.department}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    }
                                </Box>
                            </Grid>
                        )
                    })}
                </SwipeableViews>
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    backButton={
                        <Button
                            size="small"
                            onClick={handleBack}
                            disabled={activeStep === 0}>
                            <KeyboardArrowLeft />
                            Back
                        </Button>
                    }
                    nextButton={
                        <Button size="small"
                            onClick={handleNext}
                            disabled={activeStep === maxSteps - 1}>
                            Next
                            <KeyboardArrowRight />
                        </Button>
                    }
                />
            </Paper>
        </Box>
    )
};

const DropdownButton = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
    const open = Boolean(anchorEl);
    const handleDropdown = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        //@todo: create handlers for edit/delete/favorite
        //@todo: check that against our user/admin so that people dont delete/edit general tours
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton aria-label="more actions" onClick={handleDropdown}>
                <MoreVert />
            </IconButton>
            <Menu
                id="tour-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Edit</MenuItem>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
                <MenuItem onClick={handleClose}>Favorite</MenuItem>
            </Menu>
        </>
    );
}