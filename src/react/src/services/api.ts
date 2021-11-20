import { Artwork, Favorite, Tour, Location, Creator, User, UpdateUser } from './../app/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import auth from "./auth";

//@todo: export API in a config
const API_URL = "http://localhost:8080/v1/";
const baseQuery = fetchBaseQuery({ baseUrl: API_URL });
const headers = {
    Authorization: 'Bearer ' + auth.authHeader().token,
    Accept: 'application/json',
    'Content-Type': 'application/json'
};

export const api = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes: ['Artwork', 'Favorites', 'Tour', 'Public Tour'],
    endpoints: (builder) => ({
        getCollection: builder.query<Artwork[], void>({
            query: () => 'collection',
            providesTags: ['Artwork'],
        }),
        getPublicTours: builder.query<Tour[], void>({
            query: () => 'tours',
            providesTags: ['Public Tour'],
        }),
        getAllLocations: builder.query<Location[], void>({
            query: () => 'locations'
        }),
        addArtwork: builder.mutation({
            query: (artwork: Artwork) => ({
                url: 'artwork/creator/addition',
                method: 'POST',
                mode: 'cors',
                body: artwork,
                headers: headers
            })
        }),
        addLocation: builder.mutation({
            query: (location: Location) => ({
                url: 'location/addition',
                method: 'POST',
                mode: 'cors',
                body: location,
                headers: headers
            }),
        }),
        updateArtwork: builder.mutation({
            query: (artwork: Artwork) => ({
                url: 'artwork/update',
                method: 'POST',
                mode: 'cors',
                body: artwork,
                headers: headers
            }),
        }),
        updateCreator: builder.mutation({
            query: (creator: Creator) => ({
                url: 'creator/update',
                method: 'POST',
                mode: 'cors',
                body: creator,
                headers: headers
            }),
        }),
        updateLocation: builder.mutation({
            query: (location: Location) => ({
                url: 'location/update',
                method: 'POST',
                mode: 'cors',
                body: location,
                headers: headers
            }),
        }),
        deleteArtwork: builder.mutation({
            query: (artworkId: string) => ({
                url: `artwork/${artworkId}/removal`,
                method: 'POST',
                mode: 'cors',
                headers: headers
            }),
        }),
        deleteCreator: builder.mutation({
            query: (creatorId: number) => ({
                url: `creator/${creatorId}/removal`,
                method: 'POST',
                mode: 'cors',
                headers: headers
            }),
        }),
        deleteLocation: builder.mutation({
            query: (locationId: number) => ({
                url: `location/${locationId}/removal`,
                method: 'POST',
                mode: 'cors',
                headers: headers
            }),
        }),
        deleteTour: builder.mutation({
            query: (tourId: number | null) => ({
                url: `tour/${tourId}/removal`,
                method: 'POST',
                mode: 'cors',
                headers: headers
            }),
            invalidatesTags: ['Tour', 'Public Tour']
        }),
        getUserFavorites: builder.query({
            query: () => ({
                url: 'consumer/favorites',
                mode: 'cors',
                headers: headers
            }),
            providesTags: ['Favorites']
        }),
        favoriteArtwork: builder.mutation({
            query: (artworkId: string) => ({
                url: `consumer/favorites/artwork/${artworkId}`,
                method: 'POST',
                mode: 'cors',
                headers: headers,
            }),
            invalidatesTags: ['Artwork', 'Favorites']
        }),
        favoriteCreator: builder.mutation({
            query: (creatorId: number) => ({
                url: `consumer/favorites/creator/${creatorId}`,
                method: 'POST',
                mode: 'cors',
                headers: headers
            }),
        }),
        favoriteTour: builder.mutation({
            //@todo: how to avoid passing null
            query: (tourId: number | null) => ({
                url: `consumer/favorites/tour/${tourId}`,
                method: 'POST',
                mode: 'cors',
                headers: headers
            }),
            invalidatesTags: ['Tour', 'Favorites']
        }),
        deleteFavoriteArtwork: builder.mutation({
            query: (artworkId: string) => ({
                url: `consumer/favorites/artwork/${artworkId}/removal`,
                method: 'POST',
                mode: 'cors',
                headers: headers
            }),
            invalidatesTags: ['Artwork', 'Favorites']
        }),
        deleteFavoriteCreator: builder.mutation({
            query: (creatorId: number) => ({
                url: `consumer/favorites/creator/${creatorId}/removal`,
                method: 'POST',
                mode: 'cors',
                headers: headers
            }),
        }),
        deleteFavoriteTour: builder.mutation({
            query: (tourId: number | null) => ({
                url: `consumer/favorites/tour/${tourId}/removal`,
                method: 'POST',
                mode: 'cors',
                headers: headers
            }),
            invalidatesTags: ['Tour', 'Favorites']
        }),
        getToursForUser: builder.query<Tour[], void>({
            query: () => ({
                url: `consumer/tours`,
                method: 'GET',
                mode: 'cors',
                headers: headers
            }),
            providesTags: ['Tour']
        }),
        createTour: builder.mutation({
            query: (tourName: string) => ({
                url: `consumer/tour/creation`,
                method: 'POST',
                mode: 'cors',
                body: tourName,
                headers: headers
            }),
            invalidatesTags: ['Tour']
        }),
        addToTour: builder.mutation({
            query: ({ tourId, artworkId }) => ({
                url: `tour/${tourId}/artwork/${artworkId}/add`,
                method: 'POST',
                mode: 'cors',
                headers: headers
            }),
            invalidatesTags: ['Tour']
        }),
        deleteFromTour: builder.mutation({
            query: ({ tourId, artworkId }) => ({
                url: `tour/${tourId}/artwork/${artworkId}/removal`,
                method: 'POST',
                mode: 'cors',
                headers: headers
            }),
            invalidatesTags: ['Tour']
        }),
        updateTour: builder.mutation({
            query: ({ tourName, tourId }) => ({
                url: `tour/${tourId}/update`,
                method: 'POST',
                mode: 'cors',
                body: tourName,
                headers: headers
            }),
            invalidatesTags: ['Tour', 'Public Tour']
        }),
        deleteUser: builder.mutation({
            query: (userEmail: string) => ({
                url: `user/${userEmail}/removal`,
                method: 'POST',
                mode: 'cors',
                headers: headers
            }),
        }),
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
    useUpdateCreatorMutation: updateCreator,
    useUpdateLocationMutation: updateLocation,
    useUpdateTourMutation: updateTour,
    useDeleteUserMutation: deleteUser,
} = api;