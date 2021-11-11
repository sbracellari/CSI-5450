package edu.oakland.arttour.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.jdbc.core.RowMapper;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Creator {
  private int creatorId;
  private String fullName;
  private String citedName;
  private String role;
  private String nationality;
  private String birthDate;
  private String deathDate;
  private String birthPlace;
  private String deathPlace;

  public static RowMapper<Creator> mapper =
      (rs, rowNum) -> {
        Creator creator = new Creator();
        creator.setCreatorId(rs.getInt("creator_id"));
        creator.setFullName(rs.getString("full_name"));
        creator.setCitedName(rs.getString("cited_name"));
        creator.setRole(rs.getString("role"));
        creator.setNationality(rs.getString("nationality"));
        creator.setBirthDate(rs.getString("birth_date"));
        creator.setDeathDate(rs.getString("death_date"));
        creator.setBirthPlace(rs.getString("birth_place"));
        creator.setDeathPlace(rs.getString("death_place"));
        return creator;
      };
}
