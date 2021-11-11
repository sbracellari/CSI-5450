package edu.oakland.arttour.dao;

public class Constants {

  ////////// reports //////////
  public static final String GET_ADMIN_EMAILS =
      new String(" SELECT * FROM admin")
          .replaceAll("\\s+", " ");

  public static final String GET_COLLECTION =
      new String(
              " SELECT                                     "
                  + "     *                                      "
                  + " FROM                                       "
                  + "     artwork a                              "
                  + "     NATURAL JOIN artwork_has_creator ac    "
                  + "     NATURAL JOIN creator c                 "
                  + "     NATURAL JOIN location l                "
                  + " LIMIT 500                                  ")
          .replaceAll("\\s+", " ");

  public static final String GET_ALL_LOCATIONS =
      new String(
              " SELECT                                     "
                  + "     *                                      "
                  + " FROM                                       "
                  + "     location                               ")
          .replaceAll("\\s+", " ");

  ////////// queries //////////
  public static final String GET_FILTERED_COLLECTION =
  // not sure if dynamically passing a column name will work.
      new String(
              " SELECT                                     "
                  + "     *                                      "
                  + " FROM                                       "
                  + "     artwork a                              "
                  + "     NATURAL JOIN artwork_has_creator ac    "
                  + "     NATURAL JOIN creator c                 "
                  + "     NATURAL JOIN location l                "
                  + " WHERE                                      "
                  + "     ? = ?                                  "
                  + " LIMIT 500                                  ")
          .replaceAll("\\s+", " ");

  public static final String IS_ADMIN =
      new String(
              " SELECT                          "
                  + "     IF(email=?, TRUE, FALSE)    "
                  + " AS                              "
                  + "     is_admin                    "
                  + " FROM                            "
                  + "     admin                       ")
          .replaceAll("\\s+", " ");

  public static final String LOGIN =
      new String(
              " SELECT                  "
                  + "     1                   "
                  + " FROM                    "
                  + "     user                "
                  + " WHERE                   "
                  + "     email = ?           "
                  + "     AND password = ?    "
                  + " UNION ALL               "
                  + " SELECT                  "
                  + "     0                   "
                  + " LIMIT 1                 ")
          .replaceAll("\\s+", " ");

  public static final String ADD_CONSUMER =
      new String(
              " INSERT               "
                  + "     INTO consumer    "
                  + " VALUES               "
                  + "     (?)              ")
          .replaceAll("\\s+", " ");

  public static final String ADD_ADMIN =
      new String(
              " INSERT            "
                  + "     INTO admin    "
                  + " VALUES            "
                  + "     (?)           ")
          .replaceAll("\\s+", " ");

  public static final String USER_EXISTS =
      new String(
              " SELECT           "
                  + "     1            "
                  + " FROM             "
                  + "     user         "
                  + " WHERE            "
                  + "     email = ?    "
                  + " UNION ALL        "
                  + " SELECT           "
                  + "     0            "
                  + " LIMIT 1          ")
          .replaceAll("\\s+", " ");

  public static final String GET_ARTWORK =
      new String(
              " SELECT                                     "
                  + "     *                                      "
                  + " FROM                                       "
                  + "     artwork a                              "
                  + "     NATURAL JOIN artwork_has_creator ac    "
                  + "     NATURAL JOIN creator c                 "
                  + "     NATURAL JOIN location l                "
                  + " WHERE                                      "
                  + "     artwork_id = ?                         ")
          .replaceAll("\\s+", " ");

  public static final String GET_CREATOR =
      new String(
              " SELECT                  "
                  + "     *                   "
                  + " FROM                    "
                  + "     creator c           "
                  + " WHERE                   "
                  + "     c.creator_id = ?    ")
          .replaceAll("\\s+", " ");

  public static final String GET_ARTWORK_IDS =
      new String(
              " SELECT                    "
                  + "     t.artwork_id          "
                  + " FROM                      "
                  + "     tour_has_artwork t    "
                  + " WHERE                     "
                  + "     t.tour_id = ?         ")
          .replaceAll("\\s+", " ");

  public static final String GET_TOUR_IDS =
      new String(
              " SELECT             "
                  + "     t.tour_id      "
                  + " FROM               "
                  + "     tour t         "
                  + " WHERE              "
                  + "     t.email = ?    ")
          .replaceAll("\\s+", " ");

  public static final String GET_FAVORITE_TOUR_IDS =
      new String(
              " SELECT                           "
                  + "     c.tour_id                    "
                  + " FROM                             "
                  + "     consumer_favorites_tour c    "
                  + " WHERE                            "
                  + "     c.email = ?                  ")
          .replaceAll("\\s+", " ");

  public static final String GET_TOURS =
      new String(
              " SELECT                                  "
                  + "     *                                   "
                  + " FROM                                    "
                  + "     tour t                              "
                  + "     NATURAL JOIN tour_has_artwork ta    "
                  + " WHERE                                   "
                  + "     t.email = ?                         ")
          .replaceAll("\\s+", " ");

  public static final String GET_TOUR_NAME =
      new String(
              " SELECT               "
                  + "     t.tour_name      "
                  + " FROM                 "
                  + "     tour t           "
                  + " WHERE                "
                  + "     t.tour_id = ?    ")
          .replaceAll("\\s+", " ");

  public static final String GET_FAVORITE_ARTWORK_IDS =
      new String(
              " SELECT                              "
                  + "     c.artwork_id                    "
                  + " FROM                                "
                  + "     consumer_favorites_artwork c    "
                  + " WHERE                               "
                  + "     c.email = ?                     ")
          .replaceAll("\\s+", " ");

  public static final String GET_FAVORITE_CREATOR_IDS =
      new String(
              " SELECT                              "
                  + "     c.creator_id                    "
                  + " FROM                                "
                  + "     consumer_favorites_creator c    "
                  + " WHERE                               "
                  + "     c.email = ?                     ")
          .replaceAll("\\s+", " ");

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
      new String("CALL create_tour(?, ?)").replaceAll("\\s+", " ");

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
      new String("CALL delete_from_tour(?, ?)").replaceAll("\\s+", " ");

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

  public static final String REGISTER_USER =
      new String("CALL register_user(?, ?, ?, ?)").replaceAll("\\s+", " ");

  public static final String UPDATE_ARTWORK =
      new String("CALL update_artwork(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
          .replaceAll("\\s+", " ");

  public static final String UPDATE_CREATOR =
      new String("CALL update_creator(?, ?, ?, ?, ?, ?, ?, ?, ?)").replaceAll("\\s+", " ");

  public static final String UPDATE_LOCATION =
      new String("CALL update_location(?, ?, ?)").replaceAll("\\s+", " ");

  public static final String UPDATE_TOUR =
      new String("CALL update_tour(?, ?)").replaceAll("\\s+", " ");

  public static final String UPDATE_USER =
      new String("CALL update_user(?, ?, ?, ?)").replaceAll("\\s+", " ");
}
