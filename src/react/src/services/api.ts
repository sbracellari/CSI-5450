import { Artwork, Favorite, Tour, Location, Creator, User } from './../app/types';
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
                body: artwork,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
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
                    Authorization: 'Bearer ' + localStorage.getItem('token')
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
                    Authorization: 'Bearer ' + localStorage.getItem('token')
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
                    Authorization: 'Bearer ' + localStorage.getItem('token')
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
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }),
        }),
        deleteArtwork: builder.mutation({
            query: (artworkId: string) => ({
                url: `artwork/${artworkId}/removal`,
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }),
        }),
        deleteCreator: builder.mutation({
            query: (creatorId: number) => ({
                url: `creator/${creatorId}/removal`,
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }),
        }),
        deleteLocation: builder.mutation({
            query: (locationId: number) => ({
                url: `location/${locationId}/removal`,
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }),
        }),
        deleteTour: builder.mutation({
            query: (tourId: number) => ({
                url: `tour/${tourId}/removal`,
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }),
        }),
        getUserFavorites: builder.query<Favorite, string>({
            query: () => ({
                url: `consumer/favorites`,
                method: 'GET',
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }),
        }),
        favoriteArtwork: builder.mutation({
            //@todo: how to define types for 2 params
            query: (artworkId: string) => ({
                url: `consumer/favorites/artwork/${artworkId}`,
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }),
        }),
        favoriteCreator: builder.mutation({
            query: (creatorId: number) => ({
                url: `consumer/favorites/creator/${creatorId}`,
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }),
        }),
        favoriteTour: builder.mutation({
            query: (tourId: number) => ({
                url: `consumer/favorites/tour/${tourId}`,
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }),
        }),
        deleteFavoriteArtwork: builder.mutation({
            query: (artworkId: string) => ({
                url: `consumer/favorites/artwork/${artworkId}/removal`,
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }),
        }),
        deleteFavoriteCreator: builder.mutation({
            query: (creatorId: number) => ({
                url: `consumer/favorites/creator/${creatorId}/removal`,
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }),
        }),
        deleteFavoriteTour: builder.mutation({
            query: (tourId: number) => ({
                url: `consumer/favorites/tour/${tourId}/removal`,
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }),
        }),
        getToursForUser: builder.query<Tour[], string>({
            query: () => ({
                url: `consumer/tours`,
                method: 'GET',
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }),
        }),
        createTour: builder.mutation({
            query: (tourName: string) => ({
                url: `consumer/tour/creation`,
                method: 'POST',
                mode: 'cors',
                body: tourName,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }),
        }),
        addToTour: builder.mutation({
            query: ({ tourId, artworkId }) => ({
                url: `tour/${tourId}/artwork/${artworkId}/add`,
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }),
        }),
        deleteFromTour: builder.mutation({
            query: ({ tourId, artworkId }) => ({
                url: `tour/${tourId}/artwork/${artworkId}/removal`,
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }),
        }),
        updateTour: builder.mutation({
            query: ({ tourName, tourId }) => ({
                url: `tour/${tourId}/update`,
                method: 'POST',
                mode: 'cors',
                body: tourName,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }),
        }),
        deleteUser: builder.mutation({
            query: (userEmail: string) => ({
                url: `user/${userEmail}/removal`,
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }),
        }),
        updateUser: builder.mutation({
            query: ({ fName, lName, password }) => ({
                url: `user/update`,
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({ fName, lName, password }),
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
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
    useUpdateUserMutation: updateUser
} = api;