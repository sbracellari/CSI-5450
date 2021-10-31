import React from 'react';
import { Tabs, Tab } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { handleSelect, indexToTab as tabs } from './tabsSlice';
import { Collection } from '../collection/Collection';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import { Detail } from '../collection/Detail';
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
    return (
        <BrowserRouter basename='/'>
            <Tabs value={tabValue} onChange={handleTabs} centered>
                {tabComponent}
            </Tabs>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/collection" />
                </Route>
                <Route exact path="/collection" component={Collection} />
                <Route exact path="/tour" />
                <Route exact path="/favorites" />
                <Route path='/details' component={Detail} />
            </Switch>
        </BrowserRouter>
    )
}