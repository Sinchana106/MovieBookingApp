package com.cts.movie.services;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cts.movie.dto.TicketDTO;
import com.cts.movie.model.ShowTime;
import com.cts.movie.model.Ticket;
import com.cts.movie.repository.ShowTimeRepository;
import com.cts.movie.repository.TicketRepository;

@Service
public class TicketServiceImpl implements TicketService {

	@Autowired
	private ShowTimeRepository showTimeRepository;

	@Autowired
	private TicketRepository ticketRepo;

	@Override
	public List<Ticket> fetchAllTicketByUserName(String userName) {
		// TODO Auto-generated method stub
		System.out.println(this.ticketRepo.findByUserName(userName));
		return this.ticketRepo.findByUserName(userName);
	}

	@Override
	public List<Ticket> fetchAllTickets() {

		return ticketRepo.findAll();
	}

	@Override
	public Ticket saveTicket(int id, TicketDTO ticketDto) {
		Ticket ticket = new Ticket();
		ShowTime showTime = showTimeRepository.findById(id).get();
		if (showTime != null) {
			ticket.setShowTime(showTime);
			ticket.setSeatsBooked(ticketDto.getSeatsBooked());

			// To Format date And Time
			LocalDateTime dateTime = LocalDateTime.now();
			DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
			String ticketPlaceDateTime = dateTimeFormatter.format(dateTime);

			ticket.setTicketBookedDateTime(ticketPlaceDateTime);
			ticket.setTotalPrice(ticketDto.getTotalPrice());
			ticket.setUserName(ticketDto.getUserName());
			List<String> reservedList = showTime.getNoOfTicketsBooked();

			// Add Each Seat To Reserved List
			for (String seatPos : ticketDto.getSeatsBooked()) {
				reservedList.add(seatPos);
			}
			showTime.setNoOfTicketsBooked(reservedList);
			showTime.setAvailableTickets(showTime.getTotalNoOfTickets() - showTime.getNoOfTicketsBooked().size());
			if (showTime.getAvailableTickets() == 0) {
				showTime.setTicketStatus("Sold Out");
			}
			showTimeRepository.save(showTime);
			return ticketRepo.saveAndFlush(ticket);
		}
		return null;
	}

}
