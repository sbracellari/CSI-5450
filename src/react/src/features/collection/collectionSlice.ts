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
        return response.data;
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
                const data = action.payload;
                let collection: Artwork[] = [];
                console.log('data manipulation');

                data.forEach((artwork: any) => {
                    let art: Artwork = {
                        id: artwork.id,
                        title: artwork.title,
                        creationDate: artwork.creation_date,
                        medium: artwork.medium,
                        dateAquired: artwork.date_acquired,
                        provenanceText: artwork.provenance_text,
                        imageUrl: artwork.images.image_url,
                        classification: artwork.classification,
                        location: {
                            departament: artwork.department,
                            physicalLocation: artwork.physical_location,

                        },
                        creator: {
                            fullName: artwork.creator[0].full_name
                        }
                    };
                    collection.push(art);
                });
                console.log('state should update');

                state.collection = collection;
                state.status = 'idle';

            })
    }
});

export default collectionSlice.reducer;