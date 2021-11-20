package edu.oakland.arttour.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.jdbc.core.RowMapper;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
  private String email;
  private String fname;
  private String lname;
  private String password;

  public static RowMapper<User> mapper =
      (rs, rowNum) -> {
        User user = new User();
        user.setEmail(rs.getString("email"));
        user.setFname(rs.getString("fname"));
        user.setLname(rs.getString("lname"));
        user.setPassword(rs.getString("password"));
        return user;
      };
}
