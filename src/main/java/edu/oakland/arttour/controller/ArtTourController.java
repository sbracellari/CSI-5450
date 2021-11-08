package edu.oakland.arttour.controller;

import edu.oakland.arttour.model.*;
import edu.oakland.arttour.dao.ArtTourDAO;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1")
public class ArtTourController {

  private final Logger log = LoggerFactory.getLogger("arttour");
  @Autowired private ArtTourDAO dao;


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

  @GetMapping("collection")
  public List<Artwork> getCollection() {
        List collectionsList = new ArrayList<Artwork>();
        Creator creator = new Creator(
                                    "artistId",
                                    "fullName",
                                    "citedName",
                                    "role",
                                    "nationality",
                                    "birthDate",
                                    "deathDate",
                                    "birthPlace",
                                    "deathPlace"
                                    );
        Location location = new Location(
                                    "locationId",
                                    "departament",
                                    "physicalLocation"
                                    );
        Artwork collection1 = new Artwork(
                                    "id",
                                    "title",
                                    "creationDate",
                                    "medium",
                                    "creditLine",
                                    "dateAquired",
                                    "provenanceText",
                                    "imageUrl",
                                    "classification",
                                    creator,
                                    location
                                    );
        collectionsList.add(collection1);
        return collectionsList;

  }

  // test endpoint to ensure database is connected. will remove later
  @GetMapping("/getTuples")
	public List<Map<String,Object>> getTuples() {
		return dao.getCollection();
	}
}
