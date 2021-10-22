import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Button, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { handleSelect } from './headerSlice';
import { Collection } from '../collection/Collection';
import { getCollection } from '../collection/collectionSlice';
export function Header(){

    const tabValue = useAppSelector((state) => state.tabs.tab);
    const collectionStatus = useAppSelector(state => state.collection.status);
    const dispatch = useAppDispatch();
    const handleTabs = (event: React.SyntheticEvent<Element ,Event>, val: number) => {
        dispatch(handleSelect(val));
    };
    return(
        <div>
        <Tabs value={tabValue} onChange={handleTabs} centered>
            <Tab label='Collection'/>
            <Tab label='Tour'/>
            <Tab label='Favorites'/>
        </Tabs>
        {tabValue === 0 &&
          <div>  
            <Typography>
                Carnegie Museum of Art is arguably the first museum of contemporary art in the United States, collecting the “Old Masters of tomorrow” since the inception of the Carnegie International in 1896.
                Our collection of more than 34,000 objects features a broad spectrum of visual art, including painting and sculpture; prints and drawings; photographs; architectural casts, renderings, and models; decorative arts and design; and film, video, and digital imagery. The museum also houses the archive of over 70,000 negatives by photographer Charles “Teenie” Harris.
            </Typography>
            <Button onClick={ () => dispatch(getCollection()) } >View collection</Button>
                {collectionStatus === 'idle'? <Collection/> : ''}
            </div>}  
    </div>         
    )
}