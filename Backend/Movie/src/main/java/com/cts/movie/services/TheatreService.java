package com.cts.movie.services;

import java.util.List;

import com.cts.movie.model.Theatre;

public interface TheatreService {

	public List<Theatre> getAllTheatre();

	public Theatre addTheatre(Theatre theatre);

	public Theatre getTheatreById(int id);

	public List<Theatre> fetchTheatresByTheatreName(String theatreName);
}
