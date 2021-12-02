import { Artwork, Tour, Location, Creator } from './../app/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//@todo: export API in a config
const API_URL = "http://localhost:8080/v1/";
const baseQuery = fetchBaseQuery({ baseUrl: API_URL });

export const api = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes: ['Artwork', 'Favorites', 'Tour', 'Public Tour'],
    endpoints: (builder) => ({
        getCollection: builder.query<Artwork[], number>({
            query: (offset: number) => ({
                url: `collection?offset=${offset}`,
            }),
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
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }),
        addLocation: builder.mutation({
            query: (location: Location) => ({
                url: 'location/addition',
                method: 'POST',
                mode: 'cors',
                body: location,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }),
        }),
        updateArtwork: builder.mutation({
            query: (artwork: Artwork) => ({
                url: 'artwork/update',
                method: 'POST',
                mode: 'cors',
                body: artwork,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }),
        }),
        updateCreator: builder.mutation({
            query: (creator: Creator) => ({
                url: 'creator/update',
                method: 'POST',
                mode: 'cors',
                body: creator,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }),
        }),
        updateLocation: builder.mutation({
            query: (location: Location) => ({
                url: 'location/update',
                method: 'POST',
                mode: 'cors',
                body: location,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }),
        }),
        deleteArtwork: builder.mutation({
            query: (artworkId: string) => ({
                url: `artwork/${artworkId}/removal`,
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }),
        }),
        deleteCreator: builder.mutation({
            query: (creatorId: number) => ({
                url: `creator/${creatorId}/removal`,
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }),
        }),
        deleteLocation: builder.mutation({
            query: (locationId: number) => ({
                url: `location/${locationId}/removal`,
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }),
        }),
        deleteTour: builder.mutation({
            query: (tourId: number | null) => ({
                url: `tour/${tourId}/removal`,
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['Tour', 'Public Tour', 'Favorites']
        }),
        getUserFavorites: builder.query({
            query: () => ({
                url: 'consumer/favorites',
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }),
            providesTags: ['Favorites']
        }),
        favoriteArtwork: builder.mutation({
            query: (artworkId: string) => ({
                url: `consumer/favorites/artwork/${artworkId}`,
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['Favorites']
        }),
        favoriteCreator: builder.mutation({
            query: (creatorId: number) => ({
                url: `consumer/favorites/creator/${creatorId}`,
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }),
        }),
        favoriteTour: builder.mutation({
            //@todo: how to avoid passing null
            query: (tourId: number | null) => ({
                url: `consumer/favorites/tour/${tourId}`,
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['Favorites']
        }),
        deleteFavoriteArtwork: builder.mutation({
            query: (artworkId: string) => ({
                url: `consumer/favorites/artwork/${artworkId}/removal`,
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['Favorites']
        }),
        deleteFavoriteCreator: builder.mutation({
            query: (creatorId: number) => ({
                url: `consumer/favorites/creator/${creatorId}/removal`,
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }),
        }),
        deleteFavoriteTour: builder.mutation({
            query: (tourId: number | null) => ({
                url: `consumer/favorites/tour/${tourId}/removal`,
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['Favorites']
        }),
        getToursForUser: builder.query<Tour[], void>({
            query: () => ({
                url: `consumer/tours`,
                method: 'GET',
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }),
            providesTags: ['Tour']
        }),
        createTour: builder.mutation({
            query: (tourName: string) => ({
                url: `consumer/tour/creation`,
                method: 'POST',
                mode: 'cors',
                body: tourName,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['Tour']
        }),
        addToTour: builder.mutation({
            query: ({ tourId, artworkId }) => ({
                url: `tour/${tourId}/artwork/${artworkId}/add`,
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['Tour']
        }),
        deleteFromTour: builder.mutation({
            query: ({ tourId, artworkIds }) => ({
                url: `tour/${tourId}/artwork/removal`,
                method: 'POST',
                mode: 'cors',
                body: artworkIds,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['Tour', 'Favorites']
        }),
        updateTour: builder.mutation({
            query: ({ tourName, tourId }) => ({
                url: `tour/${tourId}/update`,
                method: 'POST',
                mode: 'cors',
                body: tourName,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['Tour', 'Public Tour', 'Favorites']
        }),
        deleteUser: builder.mutation({
            query: (userEmail: string) => ({
                url: `user/${userEmail}/removal`,
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }),
        }),
    })
})

export const {
    useGetCollectionQuery,
    useGetPublicToursQuery,
    useGetAllLocationsQuery,
    useGetToursForUserQuery,
    useGetUserFavoritesQuery,
    useAddArtworkMutation,
    useAddLocationMutation,
    useUpdateArtworkMutation,
    useAddToTourMutation,
    useCreateTourMutation,
    useDeleteArtworkMutation,
    useDeleteCreatorMutation,
    useDeleteFavoriteArtworkMutation,
    useDeleteFavoriteCreatorMutation,
    useDeleteFavoriteTourMutation,
    useDeleteFromTourMutation,
    useDeleteLocationMutation,
    useDeleteTourMutation,
    useFavoriteArtworkMutation,
    useFavoriteCreatorMutation,
    useFavoriteTourMutation,
    useUpdateCreatorMutation,
    useUpdateLocationMutation,
    useUpdateTourMutation,
    useDeleteUserMutation,
    usePrefetch
} = api;