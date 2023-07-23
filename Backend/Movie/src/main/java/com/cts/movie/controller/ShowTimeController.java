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

import com.cts.movie.dto.ShowTimeDTO;
import com.cts.movie.model.ShowTime;
import com.cts.movie.services.ShowTimeServiceImpl;

@RestController
@RequestMapping("/api/v1.0/moviebooking")
@CrossOrigin("*")
public class ShowTimeController {

	@Autowired
	private ShowTimeServiceImpl showTimeService;

	@PostMapping("/showTime")
	public ResponseEntity<?> addShowTime(@RequestBody ShowTimeDTO showTimeDTO) { // System.out.println(showTime.getMovieId());
		ShowTime showTime2 = showTimeService.addShowTime(showTimeDTO);
		if (showTime2 != null) {
			return new ResponseEntity<ShowTime>(showTime2, HttpStatus.CREATED);
		}

		return new ResponseEntity<String>("Show Time details are not added successfully", HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/showTimes")
	public ResponseEntity<?> fetchAllShowTime() {
		List<ShowTime> showTimes = showTimeService.fetchAllShowTime();
		if (!showTimes.isEmpty()) {
			return new ResponseEntity<List<ShowTime>>(showTimes, HttpStatus.OK);
		}
		return new ResponseEntity<String>("List is Empty", HttpStatus.CONFLICT);
	}

	@GetMapping("/showTimeDetails/{id}")
	public ResponseEntity<?> fetchShowTimeById(@PathVariable int id) {
		ShowTime showTime = showTimeService.fetchShowTimeById(id);
		if (showTime != null) {
			return new ResponseEntity<ShowTime>(showTime, HttpStatus.OK);
		}
		return new ResponseEntity<String>("ShowTime details with this id is not present", HttpStatus.CONFLICT);
	}

	@GetMapping("/showTime/{movieName}")
	public ResponseEntity<?> fetchShowTimeByMovieName(@PathVariable String movieName) {
		List<ShowTime> showTimes = showTimeService.fetchAllShowTimeByMovieName(movieName);
		if (!showTimes.isEmpty()) {
			return new ResponseEntity<List<ShowTime>>(showTimes, HttpStatus.OK);
		}
		return new ResponseEntity<String>("ShowTime details with this movie is not present", HttpStatus.CONFLICT);
	}

	@GetMapping("/showTimeTheatre/{theatreName}")
	public ResponseEntity<?> fetchShowTimeByTheatreName(@PathVariable String theatreName) {
		List<ShowTime> showTimes = showTimeService.fetchAllShowTimeByTheatreName(theatreName);
		if (!showTimes.isEmpty()) {
			return new ResponseEntity<List<ShowTime>>(showTimes, HttpStatus.OK);
		}
		return new ResponseEntity<String>("ShowTime details with this theatre is not present", HttpStatus.CONFLICT);
	}
}
