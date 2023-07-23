package com.cts.movie.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cts.movie.model.Movie;

import jakarta.transaction.Transactional;

@Repository
@Transactional // To maintain ACID Properties
public interface MovieRepository extends JpaRepository<Movie, Integer> {

	public Movie findByMovieName(String movieName);

	public List<Movie> findAllByMovieName(String movieName);
}
