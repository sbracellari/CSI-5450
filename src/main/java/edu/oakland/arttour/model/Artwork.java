package edu.oakland.arttour.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.RowMapper;

//@todo: might need to add more fileds for this model later
@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class Artwork {
    private String id;
    private String title;
    private String creationDate;
    private String medium;
    private String creditLine;
    private String dateAquired;
    private String provenanceText;
    private String imageUrl;
    private String classification;
    private Creator creator;
    private Location location;

    public static RowMapper<Artwork> mapper =
        (rs, rowNum) -> {
            Artwork artwork = new Artwork();
            artwork.setId(rs.getString("id"));
            artwork.setTitle(rs.getString("title"));
            artwork.setCreationDate(rs.getString("creation_date"));
            artwork.setMedium(rs.getString("medium"));
            artwork.setCreditLine(rs.getString("credit_line"));
            artwork.setDateAquired(rs.getString("date_acquired"));
            artwork.setProvenanceText(rs.getString("provenance_text"));
            artwork.setProvenanceText(rs.getString("classification"));
            artwork.setCreator(
                new Creator(
                    rs.getString("artist_id"),
                    rs.getString("full_name"),
                    rs.getString("cited_name"),
                    rs.getString("role"),
                    rs.getString("nationality"),
                    rs.getString("birth_date"),
                    rs.getString("death_date"),
                    rs.getString("birth_place"),
                    rs.getString("death_place")
                )
            );
            artwork.setLocation(
                new Location(
                    rs.getString("id"),
                    rs.getString("departament"),
                    rs.getString("physical_location")
                )
            );
        return artwork;
    };
}