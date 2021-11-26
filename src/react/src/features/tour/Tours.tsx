import { useCreateTourMutation, useGetPublicToursQuery, useGetToursForUserQuery } from "../../services/api";
import {
    Box,
    Grid,
    CircularProgress,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    Button,
} from "@mui/material";
import { Tour } from "./Tour";
import { useAppSelector } from "../../app/hooks";
import { Tour as TourType } from "../../app/types";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Redirect } from 'react-router-dom';
import { useState } from 'react';


const AddTour = () => {
    const [open, setOpen] = useState(false);
    const [tourName, setTourName] = useState('');
    const [nameErr, setNameErr] = useState(false);
    const [
        createNewTour
    ] = useCreateTourMutation();

    const handleTourCreate = () => {
        if (tourName === null || tourName.length === 0) {
            setNameErr(true);
        } else {
            createNewTour(tourName);
            setOpen(false);
        }
    }
    return (
        <>
            <Tooltip title='Create new tour' placement='left'>
                <Fab
                    size='small'
                    color="primary"
                    aria-label="add"
                    sx={{ position: 'fixed', right: 15, bottom: 15 }}
                    onClick={() => setOpen(true)}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
            <Dialog onClose={() => setOpen(false)} open={open}>
                <DialogTitle>Create a new tour</DialogTitle>
                <DialogContent>
                    <FormControl component="fieldset">
                        <TextField
                            sx={{ width: '300px' }}
                            placeholder='Tour name'
                            onChange={e => setTourName(e.target.value)}
                            variant='standard'
                            error={nameErr}
                            helperText={
                                nameErr
                                    ? 'Tour name cannot be empty'
                                    : ''
                            }
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button
                        onClick={() => handleTourCreate()}
                    >Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export function Tours(props: { isPublic: boolean }) {
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

    if (!isLoggedIn) {
        return <Redirect to='/login' />;
    }

    if (tours.isFetching || tours.isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>);
    }
    if (!tours.data || tours.isError) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                An error occurred.
            </Box>);
    }
    if (tours.data.length === 0) {
        return (
            <>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    No tours to display.
                </Box>
                {!isPublic && <AddTour />}
            </>
        )
    }
    return (
        <>
            <Grid container spacing={1} alignContent="center" flexDirection="column" >
                {tours.data.map((tour: TourType, index: any) => {
                    return <Tour key={tour.tourId} tour={tour} isPublic={isPublic} />
                })}
            </Grid >
            {!isPublic && <AddTour />}
        </>
    )
};
