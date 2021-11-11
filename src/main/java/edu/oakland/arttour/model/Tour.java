package edu.oakland.arttour.model;

import java.util.List;

import lombok.Data;

@Data
public class Tour {
  private String email;
  private String tourName;
  private int tourId;
  private List<Artwork> artworks;
}