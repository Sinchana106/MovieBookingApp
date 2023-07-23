package com.cts.movie.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cts.movie.dto.TicketDTO;
import com.cts.movie.model.Ticket;
import com.cts.movie.services.TicketServiceImpl;

@RestController
@RequestMapping("/api/v1.0/moviebooking")
@CrossOrigin("*")
public class TicketController {

	@Autowired
	private TicketServiceImpl ticketService;

	@PostMapping("/ticket/{id}")
	public ResponseEntity<?> saveTicket(@PathVariable int id, @RequestBody TicketDTO ticketDTO) {
		Ticket ticket = ticketService.saveTicket(id, ticketDTO);
		if (ticket != null) {
			return new ResponseEntity<Ticket>(ticket, HttpStatus.CREATED);
		}
		return new ResponseEntity<String>("Ticket is not saved", HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/ticket/{userName}")
	public ResponseEntity<?> getTicketByUsername(@PathVariable String userName) {
		List<Ticket> myTickets = ticketService.fetchAllTicketByUserName(userName);
		if (!myTickets.isEmpty()) {
			return new ResponseEntity<List<Ticket>>(myTickets, HttpStatus.OK);
		}
		return new ResponseEntity<String>("My Ticket is Empty", HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/tickets")
	public ResponseEntity<?> getAllTickets() {
		List<Ticket> tickets = ticketService.fetchAllTickets();
		if (!tickets.isEmpty()) {
			return new ResponseEntity<List<Ticket>>(tickets, HttpStatus.OK);
		}
		return new ResponseEntity<String>("My Ticket is Empty", HttpStatus.BAD_REQUEST);
	}

}
