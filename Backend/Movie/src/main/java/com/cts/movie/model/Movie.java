package com.cts.movie.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Movie {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public int movieId;

	private String movieName;

	private String language;

	private String releaseYear;

}
