package edu.oakland.arttour.dao;

public class Constants {

  ////////// queries //////////
  public static final String GET_COLLECTION =
    new String(
        " SELECT                                     " +
	    "     *                                      " +
        " FROM                                       " + 
	    "     artwork a                              " +
        "     NATURAL JOIN artwork_has_creator ac    " +
        "     NATURAL JOIN creator c                 " +
        "     NATURAL JOIN location l                " +
        " LIMIT 500                                  "
    ).replaceAll("\\s+", " ");

  ////////// reports //////////
  public static final String GET_FILTERED_COLLECTION =
    new String(
        " SELECT                                     " +
	    "     *                                      " +
        " FROM                                       " + 
	    "     artwork a                              " +
        "     NATURAL JOIN artwork_has_creator ac    " +
        "     NATURAL JOIN creator c                 " +
        "     NATURAL JOIN location l                " +
        " WHERE                                      " +
        "     ? = ?                                  " + // not sure if dynamically passing a column name will work.
        " LIMIT 500                                  "
    ).replaceAll("\\s+", " ");

  public static final String GET_TOURS =
    new String(
        " SELECT                                  " +
	    "     *                                   " +
        " FROM                                    " +
	    "     tour t                              " +
        "     NATURAL JOIN tour_has_artwork ta    " +
        " WHERE                                   " +
	    "     ta.email = ?                        " 
    ).replaceAll("\\s+", " ");


  public static final String GET_ARTWORK_FAVORITES = 
    new String(
        " SELECT                                  " +
        "     *                                   " +
        " FROM                                    " +
        "     consumer_favorites_artwork c        " +
        " WHERE                                   " +
        "     c.email = ?                         " 
    ).replaceAll("\\s+", " ");
  
  public static final String GET_CREATOR_FAVORITES = 
    new String(
        " SELECT                                  " +
        "     *                                   " +
        " FROM                                    " +
        "     consumer_favorites_creator c        " +
        " WHERE                                   " +
        "     c.email = ?                         " 
    ).replaceAll("\\s+", " ");

  public static final String GET_TOUR_FAVORITES = 
    new String(
        " SELECT                                  " +
        "     *                                   " +
        " FROM                                    " +
        "     consumer_favorites_tour c           " +
        " WHERE                                   " +
        "     c.email = ?                         " 
    ).replaceAll("\\s+", " ");

  ////////// procedures //////////
  public static final String ADD_ARTWORK =
    new String("CALL add_artwork(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").replaceAll("\\s+", " ");

  public static final String ADD_ARTWORK_AND_CREATOR = 
    new String("CALL add_artwork_and_creator(?, ?)").replaceAll("\\s+", " ");

  public static final String ADD_CREATOR =
    new String("CALL add_creator(?, ?, ?, ?, ?, ?, ?, ?, ?)").replaceAll("\\s+", " ");
  
  public static final String ADD_LOCATION = 
    new String("CALL add_location(?, ?)").replaceAll("\\s+", " ");

  public static final String ADD_TO_TOUR = 
    new String("CALL add_to_tour(?, ?)").replaceAll("\\s+", " ");

  public static final String CREATE_TOUR = 
    new String("CALL add_to_tour(?, ?)").replaceAll("\\s+", " ");

  public static final String DELETE_ARTWORK = 
    new String("CALL delete_artwork(?)").replaceAll("\\s+", " ");

  public static final String DELETE_CREATOR = 
    new String("CALL delete_creator(?)").replaceAll("\\s+", " ");

  public static final String DELETE_FAVORITE_ARTWORK =
    new String("CALL delete_favorite_artwork(?, ?)").replaceAll("\\s+", " ");

  public static final String DELETE_FAVORITE_CREATOR =
    new String("CALL delete_favorite_creator(?, ?)").replaceAll("\\s+", " ");

  public static final String DELETE_FAVORITE_TOUR =
    new String("CALL delete_favorite_tour(?, ?)").replaceAll("\\s+", " ");

  public static final String DELETE_FROM_TOUR = 
    new String("CALL delete_from_tour(?)").replaceAll("\\s+", " ");

  public static final String DELETE_LOCATION =
    new String("CALL delete_location(?)").replaceAll("\\s+", " ");

  public static final String DELETE_TOUR = 
    new String("CALL delete_tour(?)").replaceAll("\\s+", " ");

  public static final String DELETE_USER = 
    new String("CALL delete_user(?)").replaceAll("\\s+", " ");

  public static final String FAVORITE_ARTWORK = 
    new String("CALL favorite_artwork(?, ?)").replaceAll("\\s+", " ");

  public static final String FAVORITE_CREATOR = 
    new String("CALL favorite_creator(?, ?)").replaceAll("\\s+", " ");

  public static final String FAVORITE_TOUR = 
    new String("CALL favorite_tour(?, ?)").replaceAll("\\s+", " ");

  public static final String UPDATE_ARTWORK =
    new String("CALL update_artwork(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").replaceAll("\\s+", " ");

  public static final String UPDATE_CREATOR =
    new String("CALL update_creator(?, ?, ?, ?, ?, ?, ?, ?, ?)").replaceAll("\\s+", " ");
  
  public static final String UPDATE_LOCATION =
    new String("CALL update_location(?, ?, ?)").replaceAll("\\s+", " ");

  public static final String UPDATE_TOUR =
    new String("CALL update_tour(?, ?)").replaceAll("\\s+", " ");

  public static final String UPDATE_USER =
    new String("CALL update_user(?, ?, ?, ?)").replaceAll("\\s+", " ");

  ////////// functions //////////
  public static final String LOGIN =
    new String("SELECT login(?, ?) AS user_exists").replaceAll("\\s+", " ");

  public static final String REGISTER =
    new String("SELECT register(?, ?, ?, ?) AS user_created").replaceAll("\\s+", " ");
}