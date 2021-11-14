import { Artwork, Favorite, Tour, Location, Creator } from './../app/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import auth from "./auth";
//@todo: export API in a config
const API_URL = "http://localhost:8080/v1/";
const baseQuery = fetchBaseQuery({ baseUrl: API_URL });

const headers = {
    "Content-type": "application/json",
};

// const getAdmin = () => axios.get(API_URL + "admin", { headers: auth.authHeader() });
// const getUser = () => axios.get(API_URL + "user", { headers: auth.authHeader() });
export const api = createApi({
    reducerPath: 'api',
    baseQuery,
    endpoints: (builder) => ({
        getCollection: builder.query<Artwork[], void>({
            query: () => 'collection'
        }),
        getPublicTours: builder.query<Tour[], void>({
            query: () => 'tours'
        }),
        getAllLocations: builder.query<Location[], void>({
            query: () => 'locations'
        }),
        addArtwork: builder.mutation({
            query: (artwork: Artwork) => ({
                url: 'artwork/creator/addition',
                method: 'POST',
                mode: 'cors',
                body: artwork
            })
        }),
        addLocation: builder.mutation({
            query: (location: Location) => ({
                url: 'location/addition',
                method: 'POST',
                mode: 'cors',
                body: location
            }),
        }),
        updateArtwork: builder.mutation({
            query: (artwork: Artwork) => ({
                url: 'artwork/update',
                method: 'POST',
                mode: 'cors',
                body: artwork,
            }),
        }),
        updateCreator: builder.mutation({
            query: (creator: Creator) => ({
                url: 'creator/update',
                method: 'POST',
                mode: 'cors',
                body: creator,
            }),
        }),
        updateLocation: builder.mutation({
            query: (location: Location) => ({
                url: 'location/update',
                method: 'POST',
                mode: 'cors',
                body: location,
            }),
        }),
        deleteArtwork: builder.mutation({
            query: (artworkId: string) => ({
                url: `artwork/${artworkId}/removal`,
                method: 'POST',
                mode: 'cors',
            }),
        }),
        deleteCreator: builder.mutation({
            query: (creatorId: number) => ({
                url: `creator/${creatorId}/removal`,
                method: 'POST',
                mode: 'cors',
            }),
        }),
        deleteLocation: builder.mutation({
            query: (locationId: number) => ({
                url: `location/${locationId}/removal`,
                method: 'POST',
                mode: 'cors',
            }),
        }),
        deleteTour: builder.mutation({
            query: (tourId: number) => ({
                url: `tour/${tourId}/removal`,
                method: 'POST',
                mode: 'cors',
            }),
        }),
        getUserFavorites: builder.query<Favorite, string>({
            query: (email: string) => `consumer/${email}/favorites`,
        }),
        favoriteArtwork: builder.mutation({
            //@todo: how to define types for 2 params
            query: ({ email, artworkId }) => ({
                url: `consumer/${email}/favorites/artwork/${artworkId}`,
                method: 'POST',
            }),
        }),
        favoriteCreator: builder.mutation({
            query: ({ email, creatorId }) => ({
                url: `consumer/${email}/favorites/creator/${creatorId}`,
                method: 'POST',
                mode: 'cors',
            }),
        }),
        favoriteTour: builder.mutation({
            query: ({ email, tourId }) => ({
                url: `consumer/${email}/favorites/tour/${tourId}`,
                method: 'POST',
                mode: 'cors',
            }),
        }),
        deleteFavoriteArtwork: builder.mutation({
            query: ({ email, artworkId }) => ({
                url: `consumer/${email}/favorites/artwork/${artworkId}/removal`,
                method: 'POST',
                mode: 'cors',
            }),
        }),
        deleteFavoriteCreator: builder.mutation({
            query: ({ email, creatorId }) => ({
                url: `consumer/${email}/favorites/creator/${creatorId}/removal`,
                method: 'POST',
                mode: 'cors',
            }),
        }),
        deleteFavoriteTour: builder.mutation({
            query: ({ email, tourId }) => ({
                url: `consumer/${email}/favorites/tour/${tourId}/removal`,
                method: 'POST',
                mode: 'cors',
            }),
        }),
        getToursForUser: builder.query<Tour[], string>({
            query: (email: string) => `consumer/${email}/tours`,
        }),
        createTour: builder.mutation({
            query: ({ tourName, email }) => ({
                url: `consumer/${email}/tour/creation`,
                method: 'POST',
                mode: 'cors',
                body: tourName,
            }),
        }),
        addToTour: builder.mutation({
            query: ({ tourId, artworkId }) => ({
                url: `tour/${tourId}/artwork/${artworkId}/add`,
                method: 'POST',
                mode: 'cors',
            }),
        }),
        deleteFromTour: builder.mutation({
            query: ({ tourId, artworkId }) => ({
                url: `tour/${tourId}/artwork/${artworkId}/removal`,
                method: 'POST',
                mode: 'cors',
            }),
        }),
        updateTour: builder.mutation({
            query: ({ tourName, tourId }) => ({
                url: `tour/${tourId}/update`,
                method: 'POST',
                mode: 'cors',
                body: tourName,
            }),
        }),
        //this query returns an integer on the BE
        isAdmin: builder.query({
            query: (email: string) => ({
                url: `admin/${email}`,
                mode: 'cors',
            }),
        }),
        //@todo: add user apis
    })
})

export const {
    useGetCollectionQuery: getCollection,
    useGetPublicToursQuery: getPublicTours,
    useGetAllLocationsQuery: getAllLocations,
    useGetToursForUserQuery: getToursForUser,
    useGetUserFavoritesQuery: getUserFavorites,
    useAddArtworkMutation: addArtwork,
    useAddLocationMutation: addLocation,
    useUpdateArtworkMutation: updateArtwork,
    useAddToTourMutation: addToTour,
    useCreateTourMutation: createTour,
    useDeleteArtworkMutation: deleteArtwork,
    useDeleteCreatorMutation: deleteCreator,
    useDeleteFavoriteArtworkMutation: deleteFavoriteArtwork,
    useDeleteFavoriteCreatorMutation: deleteFavoriteCreator,
    useDeleteFavoriteTourMutation: deleteFavoriteTour,
    useDeleteFromTourMutation: deleteFromTour,
    useDeleteLocationMutation: deleteLocation,
    useDeleteTourMutation: deleteTour,
    useFavoriteArtworkMutation: favoriteArtwork,
    useFavoriteCreatorMutation: favoriteCreator,
    useFavoriteTourMutation: favoriteTour,
    useIsAdminQuery: isAdmin,
    useUpdateCreatorMutation: updateCreator,
    useUpdateLocationMutation: updateLocation,
    useUpdateTourMutation: updateTour
} = api;