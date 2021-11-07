// package edu.oakland.arttour.dao;

// import edu.oakland.arttour.model.Artwork;

// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.dao.DataAccessException;
// import org.springframework.jdbc.core.JdbcTemplate;
// import org.springframework.stereotype.Repository;

// @Repository
// public class ArtTourDAO {

//   @Autowired private JdbcTemplate jdbcTemplate;

//   public List<Artwork> getGeneralCollection() throws DataAccessException {
//     return jdbcTemplate.query(Constants.GET_COLLECTION, new Object[], Artwork.mapper);
//   }

//   //@todo: make params optional so we can filter with some of them not all 
//   public List<Artwork> getFilteredCollection()(String artistId, String classification, String medium) throws DataAccessException {
//     return jdbcTemplate.query(
//         return jdbcTemplate.query(Constants.GET_FILTERED_COLLECTION, new Object[] {artistId, classification, medium}, Artwork.mapper);
//     }

//   }
// }
