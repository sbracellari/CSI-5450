import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CollectionState, Artwork } from '../../app/types';
import { fetchCollection } from '../../services/api';

//@TODO: type this state and slice it even more
const initialState: CollectionState = {
    status: 'idle',
    collection: [],
}
export const getCollection = createAsyncThunk(
    'collection/fetchCollection',
    async () => {
        console.log('fetching');
        const response = await fetchCollection();
        return response;
    }
);

export const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCollection.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getCollection.fulfilled, (state, action) => {
                let data = [];
                let collection: Artwork[] = [];
                console.log('data manipulation');
                // data.forEach((artwork: any) => {
                    // let art: Artwork = {
                        // artworkId: artwork.artworkId,
                        // title: artwork.title,
                        // creationDate: artwork.creationDate,
                        // medium: artwork.medium,
                        // creditLine: artwork.creditLine,
                        // dateAcquired: artwork.dateAcquired,
                        // itemWidth: artwork.itemWidth,
                        // itemHeight: artwork.itemHeight,
                        // itemDepth: artwork.itemDepth,
                        // itemDiameter: artwork.itemDiameter,
                        // provenanceText: artwork.provenanceText,
                        // classification: artwork.classification,
                        // location: {
                            // locationId: artwork.locationId,
                            // department: artwork.department,
                            // physicalLocation: artwork.physicalLocation,
// 
                        // },
                        // creator: {
                            // creatorId: artwork.creator.creatorId,
                            // fullName: artwork.creator.fullName,
                            // citedName: artwork.creator.citedName,
                            // role: artwork.creator.role,
                            // nationality: artwork.creator.nationality,
                            // birthDate: artwork.creator.birthDate,
                            // deathDate: artwork.creator.deathDate,
                            // birthPlace: artwork.creator.birthPlace,
                            // deathPlace: artwork.creator.deathPlace,
                        // }
                    // };
                    // collection.push(art);
                // });
                // console.log('state should update');
                // state.collection = collection;
                // state.status = 'idle';

            })
    }
});

export default collectionSlice.reducer;