import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Artwork } from './collectionSlice';

export interface DetailState {
    detail?: Artwork,
}

const initialState: DetailState = {
    detail: undefined,
}

export const detailSlice = createSlice({
    name: 'detail',
    initialState,
    reducers: {
        view: (state, action: PayloadAction<Artwork>) => {
            state.detail = action.payload;
        }
    },
});

export const { view } = detailSlice.actions;
export default detailSlice.reducer;