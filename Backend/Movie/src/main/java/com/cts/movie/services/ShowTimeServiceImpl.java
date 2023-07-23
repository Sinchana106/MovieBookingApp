package com.cts.movie.services;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cts.movie.dto.ShowTimeDTO;
import com.cts.movie.model.Movie;
import com.cts.movie.model.ShowTime;
import com.cts.movie.model.Theatre;
import com.cts.movie.repository.MovieRepository;
import com.cts.movie.repository.ShowTimeRepository;
import com.cts.movie.repository.TheatreRepository;

@Service
public class ShowTimeServiceImpl implements ShowTimeService {

	@Autowired
	private ShowTimeRepository repo;

	@Autowired
	private TheatreRepository theatreRepository;

	@Autowired
	private MovieRepository movieRepository;

	@Override
	public ShowTime addShowTime(ShowTimeDTO showTimeDTO) {
		List<String> list = new ArrayList<>();
		ShowTime showTime = new ShowTime();

		Theatre theatre = theatreRepository.findById(showTimeDTO.getTheatreId()).get();
		Movie movie = movieRepository.findById(showTimeDTO.getMovieId()).get();
		showTime.setMovie(movie);
		showTime.setTheatre(theatre);

		LocalDateTime showTimings = showTimeDTO.getShowTime();
		DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("HH:mm , dd-MM-yyyy");
		String formattedShowTime = showTimings.format(dateTimeFormatter);

		showTime.setShowTime(formattedShowTime);
		showTime.setTotalNoOfTickets(theatre.getNoOfSeats());
		showTime.setAvailableTickets(theatre.getNoOfSeats());
		showTime.setPricePerTicket(showTimeDTO.getPricePerTicket());
		showTime.setNoOfTicketsBooked(list);

		if (showTime.getAvailableTickets() == 0) {
			showTime.setTicketStatus("Sold Out");
		} else {
			showTime.setTicketStatus("Available");
		}

		return repo.saveAndFlush(showTime);

	}

	@Override
	public List<ShowTime> fetchAllShowTime() {

		return repo.findAll();
	}

	public ShowTime fetchShowTimeById(int id) {
		return repo.findById(id).get();
	}

	@Override
	public List<ShowTime> fetchAllShowTimeByMovieName(String movieName) {
		List<Movie> movies = movieRepository.findAllByMovieName(movieName);
		System.out.println(movies);
		System.out.println();
		List<ShowTime> showTimes = new ArrayList<ShowTime>();
		for (Movie movie : movies) {
			showTimes.addAll(repo.findAllByMovie(movie));
			System.out.println(showTimes);
		}
		return showTimes;
	}

	public List<ShowTime> fetchAllShowTimeByTheatreName(String theatreName) {
		List<Theatre> theatres = theatreRepository.findAllByTheatreName(theatreName);
		System.out.println(theatres);
		List<ShowTime> showTimes = new ArrayList<ShowTime>();
		for (Theatre theatre : theatres) {
			showTimes.addAll(repo.findAllByTheatre(theatre));
		}
		return showTimes;
	}

}
