package com.cts.movie.services;

import java.util.List;

import com.cts.movie.model.Movie;

public interface MovieService {

	public List<Movie> getAllMovies();

	public Movie getMovieById(int movieId);

	public Movie addMovie(Movie movie);

	public Movie deleteMovie(int movieId);

	public List<Movie> fetchAllMovieByMovieName(String movieName);

}
