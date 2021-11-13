package edu.oakland.arttour.controller;

import edu.oakland.arttour.dao.ArtTourDAO;
import edu.oakland.arttour.model.Artwork;
import edu.oakland.arttour.model.Favorite;
import edu.oakland.arttour.model.Location;
import edu.oakland.arttour.model.Tour;
import edu.oakland.arttour.service.ArtTourService;
import edu.oakland.soffit.auth.AuthService;
import edu.oakland.soffit.auth.SoffitAuthException;

import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;

import com.auth0.jwt.exceptions.JWTVerificationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1")
public class ArtTourController {

  private final Logger log = LoggerFactory.getLogger("arttour");
  @Autowired private ArtTourDAO dao;
  @Autowired private ArtTourService service;
  @Autowired private AuthService authorizer;

  @ResponseStatus(value = HttpStatus.UNAUTHORIZED, reason = "Invalid JWT")
  @ExceptionHandler(JWTVerificationException.class)
  public void verificationError(Exception e) {
    log.error("Throwing Invalid JWT Error");
    log.error("", e);
  }

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

  @GetMapping("tours")
  public List<Tour> getPublicTours() {
    return service.getPublicTours();
  }

  @GetMapping("locations")
  public List<Location> getAllLocations() {
    return dao.getAllLocations();
  }

  /////////// general insert/update/delete //////////

  ///// inserts /////
  @PostMapping("artwork/creator/addition")
  public void addArtwork(HttpServletRequest request, @RequestBody Map<Object, Object> artwork)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    service.checkAdmin(email);
    service.addArtwork(artwork);
  }

  @PostMapping("location/addition")
  public void addLocation(HttpServletRequest request, @RequestBody Map<String, String> location)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    service.checkAdmin(email);
    service.addLocation(location);
  }

  ///// updates /////
  @PostMapping("artwork/update")
  public void updateArtwork(HttpServletRequest request, @RequestBody Map<Object, Object> artwork)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    service.checkAdmin(email);
    service.updateArtwork(artwork);
  }

  @PostMapping("creator/update")
  public void updateCreator(HttpServletRequest request, @RequestBody Map<Object, Object> creator)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    service.checkAdmin(email);
    service.updateCreator(creator);
  }

  @PostMapping("location/update")
  public void updateLocation(HttpServletRequest request, @RequestBody Map<Object, Object> location)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    service.checkAdmin(email);
    service.updateLocation(location);
  }

  ///// deletes /////
  @PostMapping("artwork/{artworkId}/removal")
  public void deleteArtwork(HttpServletRequest request, @PathVariable String artworkId)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    service.checkAdmin(email);
    dao.deleteArtwork(artworkId);
  }

  @PostMapping("creator/{creatorId}/removal")
  public void deleteCreator(HttpServletRequest request, @PathVariable int creatorId)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    service.checkAdmin(email);
    dao.deleteCreator(creatorId);
  }

  @PostMapping("location/{locationId}/removal")
  public void deleteLocation(HttpServletRequest request, @PathVariable int locationId)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    service.checkAdmin(email);
    dao.deleteLocation(locationId);
  }

  @PostMapping("tour/{tourId}/removal")
  public void deleteTour(HttpServletRequest request, @PathVariable int tourId)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    service.checkAdmin(email);
    dao.deleteTour(tourId);
  }

  ////////// consumer specific actions //////////

  ///// favorites /////
  @GetMapping("consumer/favorites")
  public Favorite getUserFavorites(HttpServletRequest request) throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    return service.getFavoritesForUser(email);
  }

  @PostMapping("consumer/favorites/artwork/{artworkId}")
  public void favoriteArtwork(HttpServletRequest request, @PathVariable String artworkId)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    dao.favoriteArtwork(email, artworkId);
  }

  @PostMapping("consumer/favorites/creator/{creatorId}")
  public void favoriteCreator(HttpServletRequest request, @PathVariable int creatorId)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    dao.favoriteCreator(email, creatorId);
  }

  @PostMapping("consumer/favorites/tour/{tourId}")
  public void favoriteTour(HttpServletRequest request, @PathVariable int tourId)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    dao.favoriteTour(email, tourId);
  }

  @PostMapping("consumer/favorites/artwork/{artworkId}/removal")
  public void deleteFavoriteArtwork(HttpServletRequest request, @PathVariable String artworkId)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    dao.deleteFavoriteArtwork(email, artworkId);
  }

  @PostMapping("consumer/favorites/creator/{creatorId}/removal")
  public void deleteFavoriteCreator(HttpServletRequest request, @PathVariable int creatorId)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    dao.deleteFavoriteCreator(email, creatorId);
  }

  @PostMapping("consumer/favorites/tour/{tourId}/removal")
  public void deleteFavoriteTour(HttpServletRequest request, @PathVariable int tourId)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    dao.deleteFavoriteTour(email, tourId);
  }

  ///// tours /////
  @GetMapping("consumer/tours")
  public List<Tour> getToursForUser(HttpServletRequest request) throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    return service.getToursForUser(email);
  }

  @PostMapping("consumer/tour/creation")
  public void createTour(HttpServletRequest request, @RequestBody String tourName)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    dao.createTour(tourName, email);
  }

  @PostMapping("tour/{tourId}/artwork/{artworkId}/add")
  public void addToTour(
      HttpServletRequest request, @PathVariable int tourId, @PathVariable String artworkId)
      throws SoffitAuthException {
    String email =
        authorizer.getClaimFromJWT(request, "email").asString(); // just to check if token is valid
    dao.addToTour(tourId, artworkId);
  }

  @PostMapping("tour/{tourId}/artwork/{artworkId}/removal")
  public void deleteFromTour(
      HttpServletRequest request, @PathVariable int tourId, @PathVariable String artworkId)
      throws SoffitAuthException {
    String email =
        authorizer.getClaimFromJWT(request, "email").asString(); // just to check if token is valid
    dao.deleteFromTour(tourId, artworkId);
  }

  @PostMapping("tour/{tourId}/update")
  public void updateTour(
      HttpServletRequest request, @RequestBody String tourName, @PathVariable int tourId)
      throws SoffitAuthException {
    String email =
        authorizer.getClaimFromJWT(request, "email").asString(); // just to check if token is valid
    dao.updateTour(tourName, tourId);
  }

  ////////// general user //////////
  @PostMapping("user/register")
  public Map<String, String> registerUser(@RequestBody Map<String, String> user) {
    return service.registerUser(user);
  }

  @GetMapping("user/{email}/login")
  public Map<String, String> login(@PathVariable String email) {
    return service.login(email);
  }

  @PostMapping("user/{userEmail}/removal")
  public void deleteUser(HttpServletRequest request, @PathVariable String userEmail)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    service.checkAdmin(email);
    dao.deleteUser(userEmail);
  }

  @PostMapping("user/update")
  public void updateUser(HttpServletRequest request, @RequestBody Map<String, String> userInfo)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    service.updateUser(email, userInfo);
  }
}
