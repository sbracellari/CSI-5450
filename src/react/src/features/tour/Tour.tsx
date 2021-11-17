import { Tour as TourType } from "../../app/types";
import {
    Box,
    Button,
    Menu,
    MenuItem,
    IconButton,
    Typography,
    Grid,
    MobileStepper,
    Paper,
    Tooltip,
    Fab,
    ListItemIcon,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
} from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import { useState } from "react";
import SwipeableViews from 'react-swipeable-views';
import { PlayCircle, KeyboardArrowLeft, KeyboardArrowRight, RoomOutlined, MoreVert, PhotoLibraryOutlined, Edit } from "@mui/icons-material";
import { Link, useHistory } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import { updateTour, deleteTour, favoriteTour, deleteFavoriteTour, getUserFavorites } from '../../services/api';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export function Tour(props: { tour: TourType; isPublic: boolean; }) {
    const { tour, isPublic } = props;

    const [activeStep, setActiveStep] = useState(0);
    const [disabled, setDisabled] = useState(true);
    const maxSteps = tour.artworks.length;
    const isLoggedIn = true; //todo: check user login

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
    const handleRouting = () => {
        isPublic
            ? history.push(`/public-tours/${tour.tourId}`)
            : history.push(`/my-tours/${tour.tourId}`)
    };

    //@todo: need to fix some weird padding betwin the swipe and the text
    return (
        <Box sx={{ maxWidth: 400, mt: 2 }} >
            <Paper
                sx={{
                    p: 2,
                }}
                elevation={1}>
                <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography component="div" variant="h6" >
                            {tour.tourName}
                        </Typography>
                    </Box>
                    <Box>
                        {isLoggedIn && FavoriteButton(tour)}
                        {!isPublic && DropdownButton(tour)}
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
                                    <Box>
                                        <Box
                                            component="img"
                                            sx={{
                                                height: 200,
                                                width: '100%'
                                            }}
                                            src={"./art.png"}
                                        />
                                        <Box sx={{ display: 'flex', justifyContent: 'center', float: 'right', mt: '-7%', mr: '5%' }}>
                                            <Fab component={Link}
                                                color='primary'
                                                to={
                                                    isPublic
                                                        ? `/public-tours/${tour.tourId}`
                                                        : `/my-tours/${tour.tourId}`
                                                }
                                                onClick={() => handleRouting()/*dispatch(view(artwork))*/}
                                                size='small'
                                            >
                                                <PlayArrowIcon sx={{ color: 'white' }} />
                                            </Fab>
                                        </Box>
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

const DropdownButton = (tour: TourType) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
    const open = Boolean(anchorEl);
    const handleDropdown = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };
    const dispatch = useAppDispatch();


    const handleClose = () => {
        //@todo: create handlers for edit/delete/favorite
        setAnchorEl(null);
    };

    const handleSave = (tourId: number | null, tourName: string | null) => {
        setModalOpen(false);
        setAnchorEl(null);
        console.log(tourName, tour.tourId);
        // dispatch(updateTour({ tourName, tourId })); // how to call this?
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [tourName, setTourName] = useState(tour.tourName);

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
                <MenuItem onClick={() => setModalOpen(true)}>
                    <ListItemIcon>
                        <EditIcon />
                    </ListItemIcon>
                    <ListItemText primary='Edit Name' />
                </MenuItem>
                <MenuItem
                // onClick={() => dispatch(deleteTour(tourId))} // how to call this?
                >
                    <ListItemIcon>
                        <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText primary='Delete Tour' />
                </MenuItem>
            </Menu>

            <Dialog onClose={() => setModalOpen(false)} open={modalOpen}>
                <DialogTitle>Edit Tour Name</DialogTitle>
                <DialogContent>
                    <FormControl component="fieldset">
                        <TextField
                            sx={{ width: '300px' }}
                            defaultValue={tourName}
                            onChange={e => setTourName(e.target.value)}
                            variant='standard'
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setModalOpen(false)}>Cancel</Button>
                    <Button
                        onClick={() => handleSave(tour.tourId, tourName)}
                    >Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

const FavoriteButton = (tour: TourType) => {

    const [
        addFavorite,
    ] = favoriteTour()
    const [
        deleteFavorite,
    ] = deleteFavoriteTour()

    const { data: favorites } = getUserFavorites({ skipToken: true });
    const isFavorite = favorites?.favoriteTours.find((item: TourType) => item.tourId === tour.tourId);

    return isFavorite ?
        (<Tooltip title='Unfavorite tour' placement='bottom'>
            <IconButton onClick={() => deleteFavorite(tour.tourId)} >
                <FavoriteIcon />
            </IconButton>
        </Tooltip>) :
        (<Tooltip title='Favorite tour' placement='bottom'>
            <IconButton onClick={() => addFavorite(tour.tourId)} >
                <FavoriteBorderIcon />
            </IconButton>
        </Tooltip>);

}
