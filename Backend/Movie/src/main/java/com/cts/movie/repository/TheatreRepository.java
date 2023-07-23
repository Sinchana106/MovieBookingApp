package com.cts.movie.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cts.movie.model.Theatre;

@Repository
public interface TheatreRepository extends JpaRepository<Theatre, Integer> {

	public List<Theatre> findAllByTheatreName(String theatreName);

	public Theatre findByTheatreName(String theatreName);
}
