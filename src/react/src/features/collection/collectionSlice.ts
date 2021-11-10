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
                //@todo: why can the action.payload be undefined?
                let data = action.payload || [];
                state.collection = data;
                state.status = 'idle';

            })
    }
});

export default collectionSlice.reducer;