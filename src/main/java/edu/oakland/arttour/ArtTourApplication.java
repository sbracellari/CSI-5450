package edu.oakland.arttour;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan({"edu.oakland.soffit.auth", "edu.oakland.arttour"})
public class ArtTourApplication {

  public static void main(String[] args) {
    SpringApplication.run(ArtTourApplication.class, args);
  }
}
