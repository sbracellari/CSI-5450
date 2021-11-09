package edu.oakland.arttour.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import org.springframework.jdbc.core.RowMapper;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Artwork {
    private String artworkId;
    private String title;
    private String creationDate;
    private String medium;
    private String creditLine;
    private String dateAcquired;
    private Double itemWidth;
    private Double itemHeight;
    private Double itemDepth;
    private Double itemDiameter;
    private String provenanceText;
    private String classification;
    private Creator creator;
    private Location location;

    public static RowMapper<Artwork> mapper =
        (rs, rowNum) -> {
            Artwork artwork = new Artwork();
            artwork.setArtworkId(rs.getString("artwork_id"));
            artwork.setTitle(rs.getString("title"));
            artwork.setCreationDate(rs.getString("creation_date"));
            artwork.setMedium(rs.getString("medium"));
            artwork.setCreditLine(rs.getString("credit_line"));
            artwork.setDateAcquired(rs.getString("date_acquired"));
            artwork.setItemWidth(rs.getDouble("item_width"));
            artwork.setItemHeight(rs.getDouble("item_height"));
            artwork.setItemDepth(rs.getDouble("item_depth"));
            artwork.setItemDiameter(rs.getDouble("item_diameter"));
            artwork.setProvenanceText(rs.getString("provenance_text"));
            artwork.setProvenanceText(rs.getString("classification"));
            artwork.setCreator(
                new Creator(
                    rs.getInt("creator_id"),
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
                    rs.getInt("location_id"),
                    rs.getString("department"),
                    rs.getString("physical_location")
                )
            );
        return artwork;
    };
}