import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TabState {
    tab: number
};
/* For some reason the state variable should be named 'initialState' 
 * and you can't name it 'initialTabState' or TS yells at you
*/
const initialState: TabState = {
    tab: 0
};

export const headerSlice = createSlice({
    name: 'tabs',
    initialState,
    reducers: {
        handleSelect: (state, action: PayloadAction<number>) => {
            console.log(action.payload);
            state.tab = action.payload;
        }
    }
});
export const { handleSelect } = headerSlice.actions;
export default headerSlice.reducer;

