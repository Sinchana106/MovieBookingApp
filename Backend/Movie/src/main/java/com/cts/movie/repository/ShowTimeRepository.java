package com.cts.movie.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cts.movie.model.Movie;
import com.cts.movie.model.ShowTime;
import com.cts.movie.model.Theatre;

@Repository
public interface ShowTimeRepository extends JpaRepository<ShowTime, Integer> {

	public List<ShowTime> findAllByMovie(Movie movie);
	
	public List<ShowTime> findAllByTheatre(Theatre theatre);
}
