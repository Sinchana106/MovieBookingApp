package com.cts.movie.services;

import java.util.List;

import com.cts.movie.dto.ShowTimeDTO;
import com.cts.movie.model.ShowTime;

public interface ShowTimeService {

	public ShowTime addShowTime(ShowTimeDTO showTimeDTO);

	public List<ShowTime> fetchAllShowTime();

	public List<ShowTime> fetchAllShowTimeByMovieName(String movieName);

}
