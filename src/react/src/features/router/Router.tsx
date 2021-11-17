import React, { useEffect } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { handleSelect, indexToTab as tabs } from './tabsSlice';
import { Collection } from '../collection/Collection';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import { Detail } from '../collection/Detail';
import { Login } from '../auth/Login';
import { Register } from '../auth/Register';
import { Tours } from '../tour/Tours';
import { TourStepper } from '../tour/TourStepper';
import { Admin } from '../admin/Admin';
import { Favorites } from '../favorites/Favorites';
import { AccountInfo } from '../auth/AccountInfo';
import { EditAccount } from '../auth/EditAccount';
import { MobileDrawer } from '../MobileDrawer';
import { getPublicTours, getToursForUser } from "../../services/api";

export function Router() {
    const { tab: tabValue, path } = useAppSelector((state) => state.tabs);
    let tabComponent = [];
    for (const [path, index] of Object.entries(tabs)) {
        tabComponent.push(<Tab key={`${index}_${path}`} label={path}
            to={`/${path}`} value={index} component={Link} />)
    }
    const dispatch = useAppDispatch();
    const handleTabs = (event: React.SyntheticEvent<Element, Event>, val: number) => {
        dispatch(handleSelect(val));
    };

    const publicTours = getPublicTours();
    const personalTours = getToursForUser();

    //@todo redirect back to login if a user isn't logged in
    return (
        <BrowserRouter basename='/'>
            <Switch>
                <Route exact path={['/', '/login']} component={Login} />
                <Route exact path='/register' component={Register} />
                <Route>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <MobileDrawer />
                        <Typography sx={{ fontSize: 18, ml: 2 }}><strong>YourTour - Carnegie Museum of Art</strong></Typography>
                    </Box>
                    <Switch>
                        <Route exact path='/account' component={EditAccount} />
                        <Route exact path="/collection" component={Collection}/>
                        <Route exact path='/public-tours'>
                        <Tours tours={publicTours} isPublic={true} />
                        </Route>
                        <Route exact path='/my-tours'>
                        <Tours tours={personalTours} isPublic={false} />
                        </Route>
                        <Route path="/public-tours/:tourId">
                        <TourStepper tours={publicTours} isPublic={true} />
                        </Route>
                        <Route path="/my-tours/:tourId">
                        <TourStepper tours={personalTours} isPublic={false} />
                        </Route>
                        <Route  path="/favorites" component={Favorites}/>
                        <Route exact path="/admin" component={Admin} />
                        <Route path='/details' component={Detail} />
                    </Switch>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}