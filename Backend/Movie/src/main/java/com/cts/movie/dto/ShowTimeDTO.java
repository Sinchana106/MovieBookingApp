package com.cts.movie.dto;

import java.time.LocalDateTime;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShowTimeDTO {

	@NotNull(message = "Movie Id cannot be null")
	private int movieId;

	@NotNull(message = "Theatre Id cannot be null")
	private int theatreId;

	private LocalDateTime showTime;

	@NotNull(message = "Price cannot be null")
	private float pricePerTicket;

}
