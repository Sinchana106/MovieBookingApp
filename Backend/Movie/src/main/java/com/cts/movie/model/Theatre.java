package com.cts.movie.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Theatre {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public int theatreId;

	@NotBlank(message = "Theatre name cannot be null")
	private String theatreName;

	@NotBlank(message = "Address cannot be null")
	private String address;

	@NotNull(message = "No Of Seats cannot be null")
	private int noOfSeats;

}
