package edu.oakland.arttour.service;

import edu.oakland.arttour.dao.ArtTourDAO;
import edu.oakland.arttour.model.*;

import java.util.Comparator;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArtTourService {
    
    @Autowired private ArtTourDAO dao;

    public List<Tour> getToursForUser(String email) {
        List<Integer> tourIds = dao.getTourIds(email);
        List<Tour> tours = getToursForEmail(email, tourIds);
        return tours;
    }

    private List<Tour> getFavoriteToursForUser(String email) {
        List<Integer> favoriteTourIds = dao.getFavoriteTourIds(email);
        List<Tour> tours = getToursForEmail(email, favoriteTourIds);
        return tours;
    }

    private List<Tour> getToursForEmail(String email, List<Integer> tourIds) {
        List<Tour> tours = new ArrayList<Tour>();
            
        tourIds.stream().forEach(tourId -> {
          Tour tour = new Tour();
          tour.setTourId(tourId);
          List<Artwork> artworks = new ArrayList<Artwork>();
          List<String> artworkIds = dao.getArtworkIds(tourId);
          artworkIds.stream().forEach(artworkId -> {
            Artwork artwork = dao.getArtwork(artworkId);
            artworks.add(artwork);
          });

          tour.setArtworks(artworks);
          tours.add(tour);   
        }); 
        return tours;
    }

    private List<Artwork> getFavoriteArtworksForUser(String email) {
        List<Artwork> favoriteArtworks = new ArrayList<Artwork>();
        List<String> favoriteArtworkIds = dao.getFavoriteArtworkIds(email);
        favoriteArtworkIds.stream().forEach(favoriteArtworkId -> {
            Artwork favoriteArtwork = dao.getArtwork(favoriteArtworkId);
            favoriteArtworks.add(favoriteArtwork);
        });

        return favoriteArtworks;
    }

    private List<Creator> getFavoriteCreatorsForUser(String email) {
        List<Creator> favoriteCreators = new ArrayList<Creator>();
        List<Integer> favoriteCreatorIds = dao.getFavoriteCreatorIds(email);
        favoriteCreatorIds.stream().forEach(favoriteCreatorId -> {
            Creator favoriteCreator = dao.getCreator(favoriteCreatorId);
            favoriteCreators.add(favoriteCreator);
        });

        return favoriteCreators;
    }

    public Favorite getFavoritesForUser(String email) {
        List<Artwork> favoriteArtworks = getFavoriteArtworksForUser(email);
        List<Tour> favoriteTours = getFavoriteToursForUser(email);
        List<Creator> favoriteCreators = getFavoriteCreatorsForUser(email);

        Favorite favorites = new Favorite();

        favorites.setFavoriteArtworks(favoriteArtworks);
        favorites.setFavoriteTours(favoriteTours);
        favorites.setFavoriteCreators(favoriteCreators);

        return favorites;
    }
}