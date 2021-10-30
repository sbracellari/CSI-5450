import React from 'react';
import { Box, Button, Grid, Typography, Tabs, Tab } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { handleSelect, indexToTab as tabs } from './tabsSlice';
import { Collection } from '../collection/Collection';
import { getCollection } from '../collection/collectionSlice';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
export function Router() {
    const { tab: tabValue, path } = useAppSelector((state) => state.tabs);
    let tabComponent = [];
    for (const [path, index] of Object.entries(tabs)) {
        tabComponent.push(<Tab key={`${index}_${path}`} label={path}
            to={`/${path}`} value={index} component={Link} />)
    }
    const collectionStatus = useAppSelector(state => state.collection.status);
    const dispatch = useAppDispatch();
    const handleTabs = (event: React.SyntheticEvent<Element, Event>, val: number) => {
        dispatch(handleSelect(val));
    };
    return (
        <BrowserRouter>
            <Grid container >
                <Grid item xs={12}>
                    <Tabs value={tabValue} onChange={handleTabs} centered>
                        {tabComponent}
                    </Tabs>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/collection" />
                        </Route>
                        <Route exact path="/collection">
                            <Grid item>
                                <Typography style={{ padding: 10 }}>
                                    Carnegie Museum of Art is arguably the first museum of contemporary art in the United States, collecting the “Old Masters of tomorrow” since the inception of the Carnegie International in 1896.
                                    Our collection of more than 34,000 objects features a broad spectrum of visual art, including painting and sculpture; prints and drawings; photographs; architectural casts, renderings, and models; decorative arts and design; and film, video, and digital imagery. The museum also houses the archive of over 70,000 negatives by photographer Charles “Teenie” Harris.
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                                    <Button onClick={() => dispatch(getCollection())} variant="contained">View collection</Button>
                                </Box>
                                {collectionStatus === 'idle' ? <Collection /> : ''}
                            </Grid>
                        </Route>
                        <Route exact path="/tour">
                        </Route>
                        <Route exact path="/favorites">
                        </Route>
                    </Switch>

                </Grid>
            </Grid>
        </BrowserRouter>
    )
}