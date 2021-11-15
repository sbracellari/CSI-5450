import React, { useEffect } from 'react';
import { Tabs, Tab } from '@mui/material';
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
    //@todo need to add a tab for account
    return (
        <BrowserRouter basename='/'>
            <Switch>
                <Route path='/account/login' component={Login} />
                <Route path='/account/register' component={Register} />
                <Route>
                    <Tabs value={tabValue} onChange={handleTabs} centered>
                        {tabComponent}
                    </Tabs>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/collection" />
                        </Route>
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