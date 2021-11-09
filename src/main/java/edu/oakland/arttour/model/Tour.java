package edu.oakland.arttour.model;

import lombok.Data;
import java.util.List;

import org.springframework.jdbc.core.RowMapper;

@Data
public class Tour {
    private String email;
    private String tourName;
    private int tourId;
    private List<Artwork> artworks;
}
