package edu.oakland.arttour.dao;

import edu.oakland.arttour.model.Artwork;
import edu.oakland.arttour.model.Tour;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ArtTourDAO {

  @Autowired
  private JdbcTemplate jdbcTemplate;

  public List<Artwork> getCollection() throws DataAccessException {
    return jdbcTemplate.query(Constants.GET_COLLECTION, Artwork.mapper);
  }

  // @todo: make params optional so we can filter with some of them not all
  // public List<Artwork> getFilteredCollection()(String artistId, String
  // classification, String medium) throws DataAccessException {
  // return jdbcTemplate.query(
  // return jdbcTemplate.query(Constants.GET_FILTERED_COLLECTION, new Object[]
  // {artistId, classification, medium}, Artwork.mapper);
  // }

  public List<Tour> getTours(String email) throws DataAccessException {
    return jdbcTemplate.query(Constants.GET_TOURS, Tour.mapper, new Object[] { email });
  }

  // @TODO getArtworkFavorites() -- need model
  // @TODO getCreatorFavorites() -- need model
  // @TODO getTourFavorites() -- need model

  public void addArtwork(
        String artworkId, 
        String title, 
        String creationDate, 
        String medium, 
        String creditLine,
        String dateAcquired,
        Double itemWidth,
        Double itemHeight,
        Double itemDepth,
        Double itemDiameter,
        String provenanceText,
        String classification,
        int locationId
  ) {
    jdbcTemplate.update(Constants.ADD_ARTWORK, 
        new Object[] { artworkId, title, creationDate, medium, creditLine, dateAcquired, itemWidth, 
                      itemHeight, itemDepth, itemDiameter, provenanceText, classification, locationId });
  }

  public void addArtworkAndCreator(String artworkId, int creatorId) {
    jdbcTemplate.update(Constants.ADD_ARTWORK_AND_CREATOR, new Object[] { artworkId, creatorId });
  }

  public void addCreator(
        int creatorId,
        String fullName,
        String citedName,
        String role,
        String nationality,
        String birthDate,
        String deathDate,
        String birthPlace,
        String deathPlace
  ) {
    jdbcTemplate.update(Constants.ADD_CREATOR, 
        new Object[] { creatorId, fullName, citedName, role, nationality, birthDate, deathDate, birthPlace, deathPlace });
  }

  public void addLocation(String department, String physicalLocation) {
    jdbcTemplate.update(Constants.ADD_LOCATION, new Object[] { department, physicalLocation });
  }

  public void addToTour(int tourId, String artworkId) {
    jdbcTemplate.update(Constants.ADD_TO_TOUR, new Object[] { tourId, artworkId });
  }

  public void createTour(String email, String tourName) {
    jdbcTemplate.update(Constants.CREATE_TOUR, new Object[] { email, tourName });
  }

  public void deleteArtwork(String artworkId) {
    jdbcTemplate.update(Constants.DELETE_ARTWORK, artworkId);
  }

  public void deleteCreator(int creatorId) {
    jdbcTemplate.update(Constants.DELETE_CREATOR, creatorId);
  }

  public void deleteFavoriteArtwork(String email, String artworkId) {
    jdbcTemplate.update(Constants.DELETE_FAVORITE_ARTWORK, new Object[] { email, artworkId });
  }

  public void deleteFavoriteCreator(String email, int creatorId) {
    jdbcTemplate.update(Constants.DELETE_FAVORITE_CREATOR, new Object[] { email, creatorId });
  }

  public void deleteFavoriteTour(String email, int tourId) {
    jdbcTemplate.update(Constants.DELETE_FAVORITE_TOUR, new Object[] { email, tourId });
  }

  public void deleteFromTour(int tourID) {
    jdbcTemplate.update(Constants.DELETE_FROM_TOUR, tourID);
  }

  public void deleteLocation(int locationId) {
    jdbcTemplate.update(Constants.DELETE_LOCATION, locationId);
  }

  public void deleteTour(int tourId) {
    jdbcTemplate.update(Constants.DELETE_TOUR, tourId);
  }

  public void deleteUser(String email) {
    jdbcTemplate.update(Constants.DELETE_USER, email);
  }

  public void favoriteArtwork(String email, String artworkId) {
    jdbcTemplate.update(Constants.FAVORITE_ARTWORK, new Object[] { email, artworkId });
  }

  public void favoriteCreator(String email, int creatorId) {
    jdbcTemplate.update(Constants.FAVORITE_CREATOR, new Object[] { email, creatorId });
  }

  public void favoriteTour(String email, int tourId) {
    jdbcTemplate.update(Constants.FAVORITE_TOUR, new Object[] { email, tourId });
  }

  public void updateArtwork( 
        String title, 
        String creationDate, 
        String medium, 
        String creditLine,
        String dateAcquired,
        Double itemWidth,
        Double itemHeight,
        Double itemDepth,
        Double itemDiameter,
        String provenanceText,
        String classification,
        int locationId,
        String artworkId
  ) {
    jdbcTemplate.update(Constants.UPDATE_ARTWORK, 
        new Object[] { title, creationDate, medium, creditLine, dateAcquired, itemWidth, 
                      itemHeight, itemDepth, itemDiameter, provenanceText, classification, locationId, artworkId });
  }

  public void updateCreator(
        String fullName,
        String citedName,
        String role,
        String nationality,
        String birthDate,
        String deathDate,
        String birthPlace,
        String deathPlace,
        int creatorId
  ) {
    jdbcTemplate.update(Constants.UPDATE_CREATOR, 
        new Object[] { fullName, citedName, role, nationality, birthDate, deathDate, birthPlace, deathPlace, creatorId });
  }

  public void updateLocation(String department, String physicalLocation, int locationId) {
    jdbcTemplate.update(Constants.UPDATE_LOCATION, new Object[] { department, physicalLocation, locationId });
  }

  public void updateTour(String tourName, int tourId) {
    jdbcTemplate.update(Constants.UPDATE_TOUR, new Object[] { tourName, tourId });
  }

  public void updateUser(String fName, String lName, String password, String email) {
    jdbcTemplate.update(Constants.UPDATE_USER, new Object[] { fName, lName, password, email });
  }

  // @TODO login() -- need to use SimpleJdbcCall
  // @TODO register() -- need to use SimpleJdbcCall
}
