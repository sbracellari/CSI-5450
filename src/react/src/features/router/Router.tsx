import React, { useEffect } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
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
import { AccountInfo } from '../auth/AccountInfo';
import { EditAccount } from '../auth/EditAccount';

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

    //@todo redirect back to login if a user isn't logged in
    return (
        <BrowserRouter basename='/'>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Tabs value={tabValue} onChange={handleTabs} centered sx={{ml: '10%', width: '80%', alignItems: 'center'}} >
                            {tabComponent}
                        </Tabs>
                        <AccountInfo />
                    </Box>
                    <Switch>
                        <Route exact path='/account/update' component={EditAccount} />
                        <Route exact path="/collection" component={Collection} />
                        <Route exact path="/tour" component={Tours} />
                        <Route path="/tour/:tourId" component={TourStepper} />
                        <Route exact path="/favorites" />
                        <Route exact path="/admin" component={Admin} />
                        <Route path='/details' component={Detail} />
                    </Switch>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}