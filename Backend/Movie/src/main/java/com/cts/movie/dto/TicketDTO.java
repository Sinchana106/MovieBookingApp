package com.cts.movie.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TicketDTO {

	private String userName;
	private String[] seatsBooked;
	private int totalPrice;

}
