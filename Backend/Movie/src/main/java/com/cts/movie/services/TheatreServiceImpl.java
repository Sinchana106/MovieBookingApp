package com.cts.movie.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cts.movie.model.Theatre;
import com.cts.movie.repository.TheatreRepository;

@Service
public class TheatreServiceImpl implements TheatreService {

	@Autowired
	TheatreRepository repo;

	@Override
	public List<Theatre> getAllTheatre() {
		return this.repo.findAll();
	}

	@Override
	public Theatre addTheatre(Theatre theatre) {
		theatre.setNoOfSeats(120);
		return repo.saveAndFlush(theatre);

	}

	@Override
	public Theatre getTheatreById(int id) {
		return repo.findById(id).get();
	}

	@Override
	public List<Theatre> fetchTheatresByTheatreName(String theatreName) {

		List<Theatre> theatres = repo.findAllByTheatreName(theatreName);
		return theatres;
	}

}
