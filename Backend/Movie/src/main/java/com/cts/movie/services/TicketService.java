package com.cts.movie.services;

import java.util.List;

import com.cts.movie.dto.TicketDTO;
import com.cts.movie.model.Ticket;

public interface TicketService {

	public List<Ticket> fetchAllTicketByUserName(String userName);

	public List<Ticket> fetchAllTickets();

	public Ticket saveTicket(int id, TicketDTO ticketDto);

}
