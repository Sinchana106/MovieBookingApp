package com.cts.movie.model;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int ticketId;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "showTime")
	private ShowTime showTime;

	private String userName;

	private String[] seatsBooked;

	private int totalPrice;

	private String ticketBookedDateTime;

}
