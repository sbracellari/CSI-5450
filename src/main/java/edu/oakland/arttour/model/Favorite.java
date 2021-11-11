package edu.oakland.arttour.model;

import java.util.List;

import lombok.Data;

@Data
public class Favorite {
  private List<Artwork> favoriteArtworks;
  private List<Creator> favoriteCreators;
  private List<Tour> favoriteTours;
}
