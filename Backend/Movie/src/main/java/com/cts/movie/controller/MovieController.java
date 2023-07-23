package com.cts.movie.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cts.movie.model.Movie;
import com.cts.movie.services.MovieServiceImpl;

@RestController
@RequestMapping("/api/v1.0/moviebooking")
@CrossOrigin("*")
public class MovieController {

	@Autowired
	private MovieServiceImpl movieService;

	@GetMapping("/health")
	public String status() {
		return "Working";
	}

	@PostMapping("/addMovie")
	public ResponseEntity<?> addMovies(@RequestBody Movie movie) {
		Movie movie2 = movieService.addMovie(movie);
		if (movie2 != null) {
			return new ResponseEntity<Movie>(movie2, HttpStatus.CREATED);
		}
		return new ResponseEntity<String>("Movie is not added", HttpStatus.CONFLICT);
	}

	@GetMapping("/all")
	public ResponseEntity<?> getAllMovies() {
		List<Movie> movies = movieService.getAllMovies();
		if (!movies.isEmpty()) {

			return new ResponseEntity<List<Movie>>(movies, HttpStatus.OK);
		}
		return new ResponseEntity<String>("Movie list is empty", HttpStatus.NO_CONTENT);
	}

	@PutMapping("/updateMovie/{movieId}")
	public ResponseEntity<?> updateMovie(@RequestBody Movie movie, @PathVariable int movieId) {
		Movie movie1 = this.movieService.updateMovie(movieId, movie);
		if (movie1 != null) {
			return new ResponseEntity<Movie>(movie, HttpStatus.OK);
		}
		return new ResponseEntity<String>("Movie is not updated Successfully", HttpStatus.BAD_REQUEST);
	}

	@GetMapping("movies/{movieId}")
	public ResponseEntity<?> getMovieById(@PathVariable int movieId) {

		Movie movie = movieService.getMovieById(movieId);
		if (movie != null) {
			return new ResponseEntity<Movie>(movie, HttpStatus.OK);
		}
		return new ResponseEntity<String>(movieId + " not found ", HttpStatus.NO_CONTENT);
	}

	@DeleteMapping("/delete/{movieId}")
	public ResponseEntity<?> deleteMovieById(@PathVariable int movieId) {
		Movie movie = movieService.deleteMovie(movieId);
		if (movie != null) {
			return new ResponseEntity<Movie>(movie, HttpStatus.OK);
		}
		return new ResponseEntity<String>("Movie with id : " + movieId + " is not deleted",
				HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@GetMapping("/movies/search/{movieName}")
	public ResponseEntity<?> fetchAllMoviesByMovieName(@PathVariable String movieName) {
		List<Movie> movie = movieService.fetchAllMovieByMovieName(movieName);
		if (!movie.isEmpty()) {
			return new ResponseEntity<List<Movie>>(movie, HttpStatus.OK);
		}
		return new ResponseEntity<String>("Movie with id : " + movieName + " is not deleted",
				HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
