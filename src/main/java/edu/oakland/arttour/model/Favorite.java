package edu.oakland.arttour.model;

import lombok.Data;
import java.util.List;

import org.springframework.jdbc.core.RowMapper;

@Data
public class Favorite {
    private List<Artwork> favoriteArtworks;
    private List<Creator> favoriteCreators;
    private List<Tour> favoriteTours;

    // @TODO favorites mapper
}