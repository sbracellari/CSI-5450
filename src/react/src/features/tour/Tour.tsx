import { Tour as TourType } from "../../app/types";
import { Box, Button, Menu, MenuItem, IconButton, Typography, Grid, MobileStepper, Paper } from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import { useState } from "react";
import SwipeableViews from 'react-swipeable-views';
import { PlayCircle, KeyboardArrowLeft, KeyboardArrowRight, RoomOutlined, MoreVert, PhotoLibraryOutlined } from "@mui/icons-material";
import { Link, useHistory } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import { updateTour } from '../../services/api';

export function Tour(props: { tour: TourType; isPublic: boolean; }) {
    const { tour, isPublic } = props;
    
    const dispatch = useAppDispatch();
    //@todo: start a tour
    const [activeStep, setActiveStep] = useState(0);
    const [disabled, setDisabled] = useState(true);
    const [tourName, setTourName] = useState(tour.tourName);
    const maxSteps = tour.artworks.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: any) => {
        setActiveStep(step);
    };

    const handleSave = () => {
        setDisabled(true);
        console.log(tourName, tour.tourId);
        // dispatch(updateTour({ tourName, tourId })); // how to call this?
    };

    const history = useHistory();
    const handleRouting = () => history.push(`/tour/${tour.tourId}`);

    //@todo: need to fix some weird padding betwin the swipe and the text
    return (
        <Box sx={{ maxWidth: 400, mt: 2 }} >
            <Paper
                sx={{
                    p: 2,
                }}
                elevation={1}>
                <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        {isPublic ? (
                            <Typography component="div" variant="h6" >
                                {tour.tourName}
                            </Typography>
                        ) : (
                            <>
                                <TextField
                                    defaultValue={tour.tourName} 
                                    disabled={disabled} 
                                    onChange={(e) => setTourName(e.target.value)} 
                                    variant='standard'
                                />
                                {disabled ? (
                                    <IconButton onClick={() => setDisabled(false)}>
                                        <EditIcon />
                                    </IconButton>
                                ) : (
                                    <IconButton onClick={() => handleSave()}>
                                        <SaveIcon />
                                    </IconButton>
                                )}
                            </>
                        )}    
                    </Box>
                    <Box>
                    <IconButton>
                        <FavoriteIcon />
                    </IconButton>
                    {!isPublic && DropdownButton()}
                    </Box>
                </Box>
                <Box component="div" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 1 }}>
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
                        const unknown = artwork.location.physicalLocation !== 'Unknown';
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
                                        <IconButton component={Link} to={`/tour/${tour.tourId}`}
                                            onClick={() => handleRouting()/*dispatch(view(artwork))*/}>
                                            <PlayCircle />

                                        </IconButton>
                                    </Box>
                                    <Typography component="div" variant="h6">
                                        {artwork.title}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.primary" component="div">
                                        {artwork.creator.fullName}
                                    </Typography>
                                    {(onView && unknown) &&
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
            </Menu>
        </>
    );
}