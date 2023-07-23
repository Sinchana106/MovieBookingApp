package com.cts.movie.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cts.movie.model.Theatre;
import com.cts.movie.services.TheatreServiceImpl;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1.0/moviebooking")
@CrossOrigin("*")
public class TheatreController {

	@Autowired
	private TheatreServiceImpl theatreService;

	@GetMapping("/theatres")
	public ResponseEntity<?> getAllTheatres() {
		List<Theatre> theatres = theatreService.getAllTheatre();
		if (!theatres.isEmpty()) {
			return new ResponseEntity<List<Theatre>>(theatres, HttpStatus.OK);
		}
		return new ResponseEntity<String>("Cannot Fetch Theatre List", HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/theatre/{theatreId}")
	public ResponseEntity<?> getTheatreById(@PathVariable int theatreId) {
		Theatre theatre = theatreService.getTheatreById(theatreId);
		if (theatre != null) {
			return new ResponseEntity<Theatre>(theatre, HttpStatus.OK);
		}
		return new ResponseEntity<String>("Cannot Fetch Theatre ", HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/theatreDetails/{theatreName}")
	public ResponseEntity<?> getTheatreById(@PathVariable String theatreName) {
		List<Theatre> theatres = theatreService.fetchTheatresByTheatreName(theatreName);
		if (!theatres.isEmpty()) {
			return new ResponseEntity<List<Theatre>>(theatres, HttpStatus.OK);
		}
		return new ResponseEntity<String>("Cannot Fetch Theatre List ", HttpStatus.BAD_REQUEST);
	}

	@PostMapping("/theatre")
	public ResponseEntity<?> addTheatre(@Valid @RequestBody Theatre theatre) {
		Theatre theatre2 = theatreService.addTheatre(theatre);
		if (theatre2 != null) {
			return new ResponseEntity<Theatre>(theatre2, HttpStatus.CREATED);
		}
		return new ResponseEntity<String>("Theatre details is not added!", HttpStatus.BAD_REQUEST);
	}

}
