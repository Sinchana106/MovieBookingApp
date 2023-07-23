package com.cts.movie.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cts.movie.model.Movie;
import com.cts.movie.repository.MovieRepository;

@Service
public class MovieServiceImpl implements MovieService {

	@Autowired
	private MovieRepository repo;

	@Override
	public List<Movie> getAllMovies() {
		// TODO Auto-generated method stub
		List<Movie> movies = repo.findAll();
		if (movies != null && movies.size() > 0) {
			return movies;
		}
		return null;
	}

	@Override
	public Movie getMovieById(int movieId) {
		// TODO Auto-generated method stub
		Optional<Movie> movie = repo.findById(movieId);
		if (movie.isPresent()) {
			return movie.get();
		}
		return null;
	}

	@Override
	public Movie addMovie(Movie movie) {

		return repo.saveAndFlush(movie);
	}

	@Override
	public Movie deleteMovie(int movieId) {
		Movie movie = repo.findById(movieId).get();
		repo.deleteById(movieId);

		return movie;
	}

	public Movie updateMovie(int movieId, Movie movie) {
		Movie movie1 = getMovieById(movieId);
		if (movie1 != null) {
			movie1.setMovieName(movie.getMovieName());
			movie1.setReleaseYear(movie.getReleaseYear());
			return repo.save(movie1);
		}
		return null;
	}

	public List<Movie> fetchAllMovieByMovieName(String movieName) {
		// TODO Auto-generated method stub
		List<Movie> movies = repo.findAllByMovieName(movieName);
		return movies;

	}

}
