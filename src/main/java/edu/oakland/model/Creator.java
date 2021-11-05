package edu.oakland.arttour.model;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class Creator {
    private String artistId;
    private String fullName;
    private String citedName;
    private String role;
    private String nationality;
    private String birthDate;
    private String deathDate;
    private String birthPlace;
    private String deathPlace;
}