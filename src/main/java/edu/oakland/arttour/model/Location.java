package edu.oakland.arttour.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import org.springframework.jdbc.core.RowMapper;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Location {
    private int locationId;
    private String department;
    private String physicalLocation;

    public static RowMapper<Location> mapper =
        (rs, rowNum) -> {
            Location location = new Location();
            location.setLocationId(rs.getInt("location_id"));
            location.setDepartment(rs.getString("department"));
            location.setPhysicalLocation(rs.getString("physical_location"));
        return location;
    };
}