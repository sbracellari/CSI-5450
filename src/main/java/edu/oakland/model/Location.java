package edu.oakland.arttour.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class Location {
    private String locationId;
    private String departament;
    private String physicalLocation;
}