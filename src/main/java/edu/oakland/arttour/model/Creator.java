package edu.oakland.arttour.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

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
}