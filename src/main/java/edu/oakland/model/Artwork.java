package edu.oakland.arttour.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
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
    //@todo: add rowmapper to grab db data
}