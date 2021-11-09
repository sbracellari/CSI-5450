package edu.oakland.arttour.model;

import lombok.Data;

import org.springframework.jdbc.core.RowMapper;

@Data
public class Tour {
    private String email;
    private String tourName;
    private int tourId;
    private Artwork artwork;

    public static RowMapper<Tour> mapper =
        (rs, rowNum) -> {
            Tour tour = new Tour();
            tour.setTourId(rs.getInt("tour_id"));
            tour.setEmail(rs.getString("email"));
            tour.setTourName(rs.getString("tour_name"));
            tour.setArtwork(Artwork.mapper.mapRow(rs, rowNum));
        
        return tour;
    };
}
