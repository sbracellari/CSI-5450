import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCollection } from './collectionApi';
//@TODO: should probably export all object intercaces into a file later

export interface CollectionState {
    collection: Artwork[],
    status: 'idle' | 'loading' | 'failed';
}  
export interface Artwork {
    title: string,
    creationDate: string,
    medium: string,
    dateAquired:  string,
    provenanceText: string,
    imageUrl: string,
    classification: string,
    location: Location,
    creator: Creator
}

export interface Creator {
    fullName: string,
    //citedName: string,
    //role: string,
    //nationality: string,
    //birthDate: string,
    //deathDate: string,
    //birthPlace: string,
    //deathPlace: string,
}

export interface Location{
    departament: string,
    physicalLocation: string
}
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
         view: (state, action: PayloadAction<Artwork>) => {
            // state.detail = action.payload;
         }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getCollection.pending, (state) => {
            state.status = 'loading';
          })
        .addCase(getCollection.fulfilled, (state,action) => {
            const data = action.payload;
            let collection:Artwork[] = [];
            console.log('data manipulation');

            data.forEach((artwork:any) => {
                let art: Artwork = {
                title : artwork.title,
                creationDate : artwork.creation_date,
                medium : artwork.medium,
                dateAquired : artwork.date_acquired,
                provenanceText : artwork.provenance_text,
                imageUrl : artwork.images.image_url,
                classification : artwork.classification,
                location: {
                    departament : artwork.department,
                    physicalLocation : artwork.physical_location,
                
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
  
export const { view } = collectionSlice.actions;
export default collectionSlice.reducer;