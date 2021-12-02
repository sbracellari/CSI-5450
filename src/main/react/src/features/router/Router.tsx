import { Box, Typography } from '@mui/material';
import { Collection } from '../collection/Collection';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login } from '../auth/Login';
import { Register } from '../auth/Register';
import { Tours } from '../tour/Tours';
import { TourStepper } from '../tour/TourStepper';
import { Favorites } from '../favorites/Favorites';
import { EditAccount } from '../auth/EditAccount';
import { MobileDrawer } from '../MobileDrawer';

export function Router() {
    return (
        <BrowserRouter basename='/'>
            <Switch>

                <Route>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <MobileDrawer />
                        <Typography sx={{ fontSize: 18, ml: 2 }}><strong>YourTour - Carnegie Museum of Art</strong></Typography>
                    </Box>
                    <Switch>
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/account' component={EditAccount} />
                        <Route exact path="/">
                            <Redirect to="/collection" />
                        </Route>
                        <Route exact path="/collection" component={Collection} />
                        <Route exact path='/public-tours'>
                            <Tours isPublic={true} /> {/* not sure how to avoid passing this prop. i don't think its a big deal tho */}
                        </Route>
                        <Route exact path='/my-tours'>
                            <Tours isPublic={false} />
                        </Route>
                        <Route path="/public-tours/:tourId">
                            <TourStepper isPublic={true} />
                        </Route>
                        <Route path="/my-tours/:tourId">
                            <TourStepper isPublic={false} />
                        </Route>
                        <Route path="/favorites" component={Favorites} />
                    </Switch>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}