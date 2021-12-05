package edu.oakland.arttour.controller;

import edu.oakland.arttour.dao.ArtTourDAO;
import edu.oakland.arttour.model.Artwork;
import edu.oakland.arttour.model.Favorite;
import edu.oakland.arttour.model.Location;
import edu.oakland.arttour.model.Tour;
import edu.oakland.arttour.model.User;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1")
public class ArtTourController {

  private final Logger log = LoggerFactory.getLogger("arttour");
  @Autowired private ArtTourDAO dao;
  @Autowired private ArtTourService service;
  @Autowired private AuthService authorizer;

  ////////// error handling //////////

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

  ////////// health check endpoint //////////

  @GetMapping("health-check")
  public boolean healthCheck() {
    return true;
  }

  ////////// general queries/reports //////////

  @CrossOrigin
  @GetMapping("collection")
  public List<Artwork> getCollection(@RequestParam("offset") int offset) {
    return dao.getCollection(offset);
  }

  @CrossOrigin
  @GetMapping("tours")
  public List<Tour> getPublicTours() {
    return service.getPublicTours();
  }

  @CrossOrigin
  @GetMapping("locations")
  public List<Location> getAllLocations() {
    return dao.getAllLocations();
  }

  /////////// general insert/update/delete //////////

  ///// inserts /////
  @CrossOrigin
  @PostMapping("artwork/creator/addition")
  public void addArtwork(HttpServletRequest request, @RequestBody Map<Object, Object> artwork)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    service.checkAdmin(email);
    service.addArtwork(artwork);
  }

  @CrossOrigin
  @PostMapping("location/addition")
  public void addLocation(HttpServletRequest request, @RequestBody Map<String, String> location)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    service.checkAdmin(email);
    service.addLocation(location);
  }

  ///// updates /////
  @CrossOrigin
  @PostMapping("artwork/update")
  public void updateArtwork(HttpServletRequest request, @RequestBody Map<Object, Object> artwork)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    service.checkAdmin(email);
    service.updateArtwork(artwork);
  }

  @CrossOrigin
  @PostMapping("creator/update")
  public void updateCreator(HttpServletRequest request, @RequestBody Map<Object, Object> creator)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    service.checkAdmin(email);
    service.updateCreator(creator);
  }

  @CrossOrigin
  @PostMapping("location/update")
  public void updateLocation(HttpServletRequest request, @RequestBody Map<Object, Object> location)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    service.checkAdmin(email);
    service.updateLocation(location);
  }

  ///// deletes /////
  @CrossOrigin
  @PostMapping("artwork/{artworkId}/removal")
  public void deleteArtwork(HttpServletRequest request, @PathVariable String artworkId)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    service.checkAdmin(email);
    dao.deleteArtwork(artworkId);
  }

  @CrossOrigin
  @PostMapping("creator/{creatorId}/removal")
  public void deleteCreator(HttpServletRequest request, @PathVariable int creatorId)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    service.checkAdmin(email);
    dao.deleteCreator(creatorId);
  }

  @CrossOrigin
  @PostMapping("location/{locationId}/removal")
  public void deleteLocation(HttpServletRequest request, @PathVariable int locationId)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    service.checkAdmin(email);
    dao.deleteLocation(locationId);
  }

  @CrossOrigin
  @PostMapping("tour/{tourId}/removal")
  public void deleteTour(HttpServletRequest request, @PathVariable int tourId)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    dao.deleteTour(tourId);
  }

  ////////// consumer specific actions //////////

  ///// favorites /////
  @CrossOrigin
  @GetMapping("consumer/favorites")
  public Favorite getUserFavorites(HttpServletRequest request) throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    return service.getFavoritesForUser(email);
  }

  @CrossOrigin
  @PostMapping("consumer/favorites/artwork/{artworkId}")
  public void favoriteArtwork(HttpServletRequest request, @PathVariable String artworkId)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    dao.favoriteArtwork(email, artworkId);
  }

  @CrossOrigin
  @PostMapping("consumer/favorites/creator/{creatorId}")
  public void favoriteCreator(HttpServletRequest request, @PathVariable int creatorId)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    dao.favoriteCreator(email, creatorId);
  }

  @CrossOrigin
  @PostMapping("consumer/favorites/tour/{tourId}")
  public void favoriteTour(HttpServletRequest request, @PathVariable int tourId)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    dao.favoriteTour(email, tourId);
  }

  @CrossOrigin
  @PostMapping("consumer/favorites/artwork/{artworkId}/removal")
  public void deleteFavoriteArtwork(HttpServletRequest request, @PathVariable String artworkId)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    dao.deleteFavoriteArtwork(email, artworkId);
  }

  @CrossOrigin
  @PostMapping("consumer/favorites/creator/{creatorId}/removal")
  public void deleteFavoriteCreator(HttpServletRequest request, @PathVariable int creatorId)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    dao.deleteFavoriteCreator(email, creatorId);
  }

  @CrossOrigin
  @PostMapping("consumer/favorites/tour/{tourId}/removal")
  public void deleteFavoriteTour(HttpServletRequest request, @PathVariable int tourId)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    dao.deleteFavoriteTour(email, tourId);
  }

  ///// tours /////
  @CrossOrigin
  @GetMapping("consumer/tours")
  public List<Tour> getToursForUser(HttpServletRequest request) throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    return service.getToursForUser(email);
  }

  @CrossOrigin
  @PostMapping("consumer/tour/creation")
  public void createTour(HttpServletRequest request, @RequestBody String tourName)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    dao.createTour(tourName, email);
  }

  @CrossOrigin
  @PostMapping("tour/{tourId}/artwork/{artworkId}/add")
  public void addToTour(
      HttpServletRequest request, @PathVariable int tourId, @PathVariable String artworkId)
      throws SoffitAuthException {
    String email =
        authorizer.getClaimFromJWT(request, "email").asString(); // just to check if token is valid
    dao.addToTour(tourId, artworkId);
  }

  @CrossOrigin
  @PostMapping("tour/{tourId}/artwork/removal")
  public void deleteFromTour(
      HttpServletRequest request, @PathVariable int tourId, @RequestBody List<String> artworkIds)
      throws SoffitAuthException {
    String email =
        authorizer.getClaimFromJWT(request, "email").asString(); // just to check if token is valid
    artworkIds.stream().forEach(artworkId -> dao.deleteFromTour(tourId, artworkId));
  }

  @CrossOrigin
  @PostMapping("tour/{tourId}/update")
  public void updateTour(
      HttpServletRequest request, @RequestBody String tourName, @PathVariable int tourId)
      throws SoffitAuthException {
    String email =
        authorizer.getClaimFromJWT(request, "email").asString(); // just to check if token is valid
    dao.updateTour(tourName, tourId);
  }

  ////////// general user //////////
  @CrossOrigin
  @PostMapping("user/register")
  public Map<String, String> registerUser(@RequestBody Map<String, String> user) {
    return service.registerUser(user);
  }

  @CrossOrigin
  @GetMapping("user/{email}/login")
  public Map<String, String> login(@PathVariable String email) {
    return service.login(email);
  }

  @CrossOrigin
  @PostMapping("user/{userEmail}/removal")
  public void deleteUser(HttpServletRequest request, @PathVariable String userEmail)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    service.checkAdmin(email);
    dao.deleteUser(userEmail);
  }

  @CrossOrigin
  @PostMapping("user/update")
  public User updateUser(HttpServletRequest request, @RequestBody Map<String, String> userInfo)
      throws SoffitAuthException {
    String email = authorizer.getClaimFromJWT(request, "email").asString();
    service.updateUser(email, userInfo);
    return dao.login(email);
  }
}
