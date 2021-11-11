package edu.oakland.arttour.dao;

import edu.oakland.arttour.model.Artwork;
import edu.oakland.arttour.model.Creator;
import edu.oakland.arttour.model.Location;

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

  public Integer isAdmin(String email) throws DataAccessException {
    return Integer.parseInt(jdbcTemplate.queryForObject(Constants.IS_ADMIN, String.class, email));  
  }

  public Integer userExists(String email) throws DataAccessException {
    return Integer.parseInt(jdbcTemplate.queryForObject(Constants.USER_EXISTS, String.class, email));
  }

  public void registerUser(String email, String fName, String lName, String password) {
    jdbcTemplate.update(Constants.REGISTER_USER, new Object[] { email, fName, lName, password });
  }

  public Integer login(String email, String password) throws DataAccessException{
    return Integer.parseInt(jdbcTemplate.queryForObject(Constants.LOGIN, String.class, new Object[] { email, password }));
  }

  public void addConsumer(String email) {
    jdbcTemplate.update(Constants.ADD_CONSUMER, email);  
  }

  public void addAdmin(String email) {
    jdbcTemplate.update(Constants.ADD_ADMIN, email);  
  }

  // @todo: make params optional so we can filter with some of them not all
  // public List<Artwork> getFilteredCollection()(String artistId, String
  // classification, String medium) throws DataAccessException {
  // return jdbcTemplate.query(
  // return jdbcTemplate.query(Constants.GET_FILTERED_COLLECTION, new Object[]
  // {artistId, classification, medium}, Artwork.mapper);
  // }

  public List<Integer> getFavoriteTourIds(String email) throws DataAccessException {
    return jdbcTemplate.queryForList(Constants.GET_FAVORITE_TOUR_IDS, Integer.class, email);
  }

  public List<Integer> getTourIds(String email) throws DataAccessException {
    return jdbcTemplate.queryForList(Constants.GET_TOUR_IDS, Integer.class, email);
  }

  public List<String> getArtworkIds(int tourId) throws DataAccessException {
    return jdbcTemplate.queryForList(Constants.GET_ARTWORK_IDS, String.class, tourId);
  }

  public Artwork getArtwork(String artworkId) throws DataAccessException {
    return jdbcTemplate.queryForObject(Constants.GET_ARTWORK, Artwork.mapper, artworkId);
  }

  public Creator getCreator(int creatorId) throws DataAccessException {
    return jdbcTemplate.queryForObject(Constants.GET_CREATOR, Creator.mapper, creatorId);
  }

  public List<Location> getAllLocations() {
    return jdbcTemplate.query(Constants.GET_ALL_LOCATIONS, Location.mapper);
  }

  public List<String> getFavoriteArtworkIds(String email) throws DataAccessException {
    return jdbcTemplate.queryForList(Constants.GET_FAVORITE_ARTWORK_IDS, String.class, email);
  }

  public List<Integer> getFavoriteCreatorIds(String email) throws DataAccessException {
    return jdbcTemplate.queryForList(Constants.GET_FAVORITE_CREATOR_IDS, Integer.class, email);
  }

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

  public void createTour(String tourName, String email) {
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

  public void deleteFromTour(int tourId, String artworkId) {
    jdbcTemplate.update(Constants.DELETE_FROM_TOUR, new Object[] { tourId, artworkId });
  }

  public String getTourName(int tourId) {
    return jdbcTemplate.queryForObject(Constants.GET_TOUR_NAME, String.class, tourId);
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
    jdbcTemplate.update(Constants.UPDATE_ARTWORK, 
        new Object[] { artworkId, title, creationDate, medium, creditLine, dateAcquired, itemWidth, 
                      itemHeight, itemDepth, itemDiameter, provenanceText, classification, locationId });
  }

  public void updateCreator(
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
    jdbcTemplate.update(Constants.UPDATE_CREATOR, 
        new Object[] { creatorId, fullName, citedName, role, nationality, birthDate, deathDate, birthPlace, deathPlace });
  }

  public void updateLocation(Integer locationId, String department, String physicalLocation) {
    jdbcTemplate.update(Constants.UPDATE_LOCATION, new Object[] { locationId, department, physicalLocation });
  }

  public void updateTour(String tourName, int tourId) {
    jdbcTemplate.update(Constants.UPDATE_TOUR, new Object[] { tourId, tourName });
  }

  public void updateUser(String email, String fName, String lName, String password) {
    jdbcTemplate.update(Constants.UPDATE_USER, new Object[] { email, fName, lName, password });
  }

  // @TODO login() -- need to use SimpleJdbcCall
  // @TODO register() -- need to use SimpleJdbcCall
}
