package edu.oakland.arttour.controller;

import edu.oakland.arttour.model.Artwork;
import edu.oakland.arttour.model.Location;
import edu.oakland.arttour.model.Tour;
import edu.oakland.arttour.model.Favorite;
import edu.oakland.arttour.service.ArtTourService;
import edu.oakland.arttour.dao.ArtTourDAO;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/v1")
public class ArtTourController {

  private final Logger log = LoggerFactory.getLogger("arttour");
  @Autowired private ArtTourDAO dao;
  @Autowired private ArtTourService service;

  @ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Illegal Arguments given")
  @ExceptionHandler({IllegalArgumentException.class, DataAccessException.class})
  public void illegalArgumentError(Exception e) {
    log.error("Throwing Illegal Argument or Data Access error", e);
  }

  @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR, reason = "Unspecified exception")
  @ExceptionHandler(Exception.class)
  public void generalError(Exception e) {
    log.error("Unspecified exception", e);
  }

  @GetMapping("health-check")
  public boolean healthCheck() {
    return true;
  }

  ////////// general queries/reports //////////

  @CrossOrigin
  @GetMapping("collection")
  public List<Artwork> getCollection() {
    return dao.getCollection(); 
  }

  // @TODO filtered collection
  // @GetMapping("filtered-collection")
  // public List<Artwork> getFilteredCollection() {}

  @GetMapping("locations")
  public List<Location> getAllLocations() {
    return dao.getAllLocations();
  }

  /////////// general insert/update/delete //////////

  ///// inserts /////
  @PostMapping("artwork/creator/addition")
  public void addArtwork(@RequestBody Map<Object, Object> artwork) {
    service.addArtwork(artwork);
  }

  @PostMapping("location/addition")
  public void addLocation(@RequestBody Map<String, String> location) {
    service.addLocation(location);
  }

  ///// updates /////
  @PostMapping("artwork/update")
  public void updateArtwork(@RequestBody Map<Object, Object> artwork) {
    service.updateArtwork(artwork);
  }

  @PostMapping("creator/update")
  public void updateCreator(@RequestBody Map<Object, Object> creator) {
    service.updateCreator(creator);
  }

  @PostMapping("location/update") 
  public void updateLocation(@RequestBody Map<Object, Object> location) {
    service.updateLocation(location);
  }

  ///// deletes /////
  @PostMapping("artwork/{artworkId}/removal")
  public void deleteArtwork(@PathVariable String artworkId) {
    dao.deleteArtwork(artworkId);
  }

  @PostMapping("creator/{creatorId}/removal")
  public void deleteCreator(@PathVariable int creatorId) {
    dao.deleteCreator(creatorId);
  }

  @PostMapping("location/{locationId}/removal") 
  public void deleteLocation(@PathVariable int locationId) {
    dao.deleteLocation(locationId);
  }

  @PostMapping("tour/{tourId}/removal") 
  public void deleteTour(@PathVariable int tourId) {
    dao.deleteTour(tourId);
  }

  ////////// consumer specific actions //////////

  ///// favorites /////
  @GetMapping("consumer/{email}/favorites")
  public Favorite getUserFavorites(@PathVariable String email) {
    return service.getFavoritesForUser(email);
  }

  @PostMapping("consumer/{email}/favorites/artwork/{artworkId}")
  public void favoriteArtwork(@PathVariable String email, @PathVariable String artworkId) {
    dao.favoriteArtwork(email, artworkId);
  }

  @PostMapping("consumer/{email}/favorites/creator/{creatorId}")
  public void favoriteCreator(@PathVariable String email, @PathVariable int creatorId) {
    dao.favoriteCreator(email, creatorId);
  }

  @PostMapping("consumer/{email}/favorites/tour/{tourId}")
  public void favoriteTour(@PathVariable String email, @PathVariable int tourId) {
    dao.favoriteTour(email, tourId);
  }

  @PostMapping("consumer/{email}/favorites/artwork/{artworkId}/removal")
  public void deleteFavoriteArtwork(@PathVariable String email, @PathVariable String artworkId) {
    dao.deleteFavoriteArtwork(email, artworkId);
  }

  @PostMapping("consumer/{email}/favorites/creator/{creatorId}/removal")
  public void deleteFavoriteCreator(@PathVariable String email, @PathVariable int creatorId) {
    dao.deleteFavoriteCreator(email, creatorId);
  }

  @PostMapping("consumer/{email}/favorites/tour/{tourId}/removal")
  public void deleteFavoriteTour(@PathVariable String email, @PathVariable int tourId) {
    dao.deleteFavoriteTour(email, tourId);
  }

  ///// tours /////
  @GetMapping("consumer/{email}/tours")
  public List<Tour> getToursForUser(@PathVariable String email) {
    return service.getToursForUser(email);
  }

  @PostMapping("consumer/{email}/tour/creation")
  public void createTour(@PathVariable String email, @RequestBody String tourName) {
    dao.createTour(tourName, email);
  }

  @PostMapping("tour/{tourId}/artwork/{artworkId}/add")
  public void addToTour(@PathVariable int tourId, @PathVariable String artworkId) {
    dao.addToTour(tourId, artworkId);
  }

  @PostMapping("tour/{tourId}/artwork/{artworkId}/removal")
  public void deleteFromTour(@PathVariable int tourId, @PathVariable String artworkId) {
    dao.deleteFromTour(tourId, artworkId);
  }

  @PostMapping("tour/{tourId}/update") 
  public void updateTour(@RequestBody String tourName, @PathVariable int tourId) {
    dao.updateTour(tourName, tourId);
  }

  ////////// admin //////////
  @GetMapping("admin/{email}")
  public Integer isAdmin(@PathVariable String email) {
    return dao.isAdmin(email);
  }

  ////////// general user //////////
  @PostMapping("user/register/{userType}")
  public boolean registerUser(@RequestBody Map<String, String> user, @PathVariable String userType) {
    return service.registerUser(user, userType);
  }

  @GetMapping("user/{email}/login")
  public Integer login(@RequestBody Map<String, String> userCreds) {
    return service.login(userCreds);
  }

  @PostMapping("user/{email}/removal")
  public void deleteUser(@PathVariable String email) {
    dao.deleteUser(email);
  }

  @PostMapping("user/update")
  public void updateUser(@RequestBody Map<String, String> user) {
    service.updateUser(user);
  }
}
