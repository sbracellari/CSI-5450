import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TabState } from '../../app/types';

export const tabToIndex: { [key: number]: string } = {
    0: 'collection',
    1: 'tour',
    2: 'favorites'
}
export const indexToTab: { [key: string]: number } = {
    collection: 0,
    tour: 1,
    favorites: 2
}
/* For some reason the state variable should be named 'initialState' 
 * and you can't name it 'initialTabState' or TS yells at you
*/

const initialState: TabState = {
    tab: 0,
    path: tabToIndex[0]
};

export const tabsSlice = createSlice({
    name: 'tabs',
    initialState,
    reducers: {
        handleSelect: (state, action: PayloadAction<number>) => {
            console.log(action.payload);
            state.tab = action.payload;
            state.path = tabToIndex[action.payload];
        }
    }
});
export const { handleSelect } = tabsSlice.actions;
export default tabsSlice.reducer;

