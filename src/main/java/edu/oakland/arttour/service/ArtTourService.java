package edu.oakland.arttour.service;

import edu.oakland.arttour.dao.ArtTourDAO;
import edu.oakland.arttour.model.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArtTourService {

  @Autowired private ArtTourDAO dao;

  public Integer login(Map<String, String> userCreds) {
    String email = userCreds.get("email");
    String password = userCreds.get("password");

    return dao.login(email, password);
  }

  public boolean registerUser(Map<String, String> user, String userType) {
    String email = user.get("email");
    String fName = user.get("fName");
    String lName = user.get("lName");
    String password = user.get("password");

    Integer userExists = dao.userExists(email);

    if (userExists == 1) {
      return false; // registration not successful because the email already exists in the database
    }

    dao.registerUser(email, fName, lName, password);

    if (userType.equals("consumer")) {
      dao.addConsumer(email);
    } else if (userType.equals("admin")) {
      dao.addAdmin(email);
    } else {
      return false;
    }

    return true; // registration successful
  }

  public void addLocation(Map<String, String> location) {
    String department = location.get("department");
    String physicalLocation = location.get("physicalLocation");
    dao.addLocation(department, physicalLocation);
  }

  public void addArtwork(Map<Object, Object> artwork) {
    String artworkId = (String) artwork.get("artworkId");
    String title = (String) artwork.get("title");
    String creationDate = (String) artwork.get("creationDate");
    String medium = (String) artwork.get("medium");
    String creditLine = (String) artwork.get("creditLine");
    String dateAcquired = (String) artwork.get("dateAcquired");
    Double itemWidth = (Double) artwork.get("itemWidth");
    Double itemHeight = (Double) artwork.get("itemHeight");
    Double itemDepth = (Double) artwork.get("itemDepth");
    Double itemDiameter = (Double) artwork.get("itemDiameter");
    String provenanceText = (String) artwork.get("provenanceText");
    String classification = (String) artwork.get("classification");
    Integer locationId = (Integer) artwork.get("locationId");

    Integer creatorId = (Integer) artwork.get("creatorId");
    String fullName = (String) artwork.get("fullName");
    String citedName = (String) artwork.get("citedName");
    String role = (String) artwork.get("role");
    String nationality = (String) artwork.get("nationality");
    String birthDate = (String) artwork.get("birthDate");
    String deathDate = (String) artwork.get("deathDate");
    String birthPlace = (String) artwork.get("birthPlace");
    String deathPlace = (String) artwork.get("deathPlace");

    dao.addArtwork(
        artworkId,
        title,
        creationDate,
        medium,
        creditLine,
        dateAcquired,
        itemWidth,
        itemHeight,
        itemDepth,
        itemDiameter,
        provenanceText,
        classification,
        locationId);
    dao.addCreator(
        creatorId,
        fullName,
        citedName,
        role,
        nationality,
        birthDate,
        deathDate,
        birthPlace,
        deathPlace);
    dao.addArtworkAndCreator(artworkId, creatorId);
  }

  public void updateArtwork(Map<Object, Object> artwork) {
    String artworkId = (String) artwork.get("artworkId");
    String title = (String) artwork.get("title");
    String creationDate = (String) artwork.get("creationDate");
    String medium = (String) artwork.get("medium");
    String creditLine = (String) artwork.get("creditLine");
    String dateAcquired = (String) artwork.get("dateAcquired");
    Double itemWidth = (Double) artwork.get("itemWidth");
    Double itemHeight = (Double) artwork.get("itemHeight");
    Double itemDepth = (Double) artwork.get("itemDepth");
    Double itemDiameter = (Double) artwork.get("itemDiameter");
    String provenanceText = (String) artwork.get("provenanceText");
    String classification = (String) artwork.get("classification");
    Integer locationId = (Integer) artwork.get("locationId");

    dao.updateArtwork(
        artworkId,
        title,
        creationDate,
        medium,
        creditLine,
        dateAcquired,
        itemWidth,
        itemHeight,
        itemDepth,
        itemDiameter,
        provenanceText,
        classification,
        locationId);
  }

  public void updateCreator(Map<Object, Object> creator) {
    Integer creatorId = (Integer) creator.get("creatorId");
    String fullName = (String) creator.get("fullName");
    String citedName = (String) creator.get("citedName");
    String role = (String) creator.get("role");
    String nationality = (String) creator.get("nationality");
    String birthDate = (String) creator.get("birthDate");
    String deathDate = (String) creator.get("deathDate");
    String birthPlace = (String) creator.get("birthPlace");
    String deathPlace = (String) creator.get("deathPlace");

    dao.updateCreator(
        creatorId,
        fullName,
        citedName,
        role,
        nationality,
        birthDate,
        deathDate,
        birthPlace,
        deathPlace);
  }

  public void updateLocation(Map<Object, Object> location) {
    Integer locationId = (Integer) location.get("locationId");
    String department = (String) location.get("department");
    String physicalLocation = (String) location.get("physicalLocation");

    dao.updateLocation(locationId, department, physicalLocation);
  }

  public void updateUser(Map<String, String> user) {
    String email = user.get("email");
    String fName = user.get("fName");
    String lName = user.get("lName");
    String password = user.get("password");

    dao.updateUser(email, fName, lName, password);
  }

  public List<Tour> getToursForUser(String email) {
    List<Integer> tourIds = dao.getTourIds(email);
    List<Tour> tours = getToursForEmail(email, tourIds);
    return tours;
  }

  public List<Tour> getPublicTours() {
    List<String> adminEmails = dao.getAdminEmails();
    List<Tour> publicTours = new ArrayList<Tour>();
    adminEmails.stream().forEach(email -> {
      List<Integer> tourIds = dao.getTourIds(email);
      List<Tour> tours = getToursForEmail(email, tourIds);

      tours.stream().forEach(tour -> {
        publicTours.add(tour);
      });
    });

    return publicTours;
  }

  private List<Tour> getFavoriteToursForUser(String email) {
    List<Integer> favoriteTourIds = dao.getFavoriteTourIds(email);
    List<Tour> tours = getToursForEmail(email, favoriteTourIds);
    return tours;
  }

  private List<Tour> getToursForEmail(String email, List<Integer> tourIds) {
    List<Tour> tours = new ArrayList<Tour>();

    tourIds.stream()
        .forEach(
            tourId -> {
              Tour tour = new Tour();
              tour.setTourId(tourId);
              tour.setEmail(email);
              tour.setTourName(dao.getTourName(tourId));
              List<Artwork> artworks = new ArrayList<Artwork>();
              List<String> artworkIds = dao.getArtworkIds(tourId);
              artworkIds.stream()
                  .forEach(
                      artworkId -> {
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
    favoriteArtworkIds.stream()
        .forEach(
            favoriteArtworkId -> {
              Artwork favoriteArtwork = dao.getArtwork(favoriteArtworkId);
              favoriteArtworks.add(favoriteArtwork);
            });

    return favoriteArtworks;
  }

  private List<Creator> getFavoriteCreatorsForUser(String email) {
    List<Creator> favoriteCreators = new ArrayList<Creator>();
    List<Integer> favoriteCreatorIds = dao.getFavoriteCreatorIds(email);
    favoriteCreatorIds.stream()
        .forEach(
            favoriteCreatorId -> {
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
