import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShowTime } from '../showTime/show-time';

@Injectable({
  providedIn: 'root'
})
export class ShowTimeService {

  BASIC_URL = "http://localhost:8080/api/v1.0/moviebooking";

  constructor(private http: HttpClient) { }

  public addShowTime(addShowTime: NgForm) {
    return this.http.post(this.BASIC_URL + "/showTime", addShowTime);
  }

  public getAllShowTimeDetails() {
    return this.http.get<ShowTime[]>(this.BASIC_URL + "/showTimes");
  }

  public getAllShowTimeDetailsByMovieName(movieName: string) {
    return this.http.get<ShowTime[]>(this.BASIC_URL + "/showTime/" + movieName);
  }

  public getAllShowTimeDetailsByTheatreName(theatreName: string) {
    return this.http.get<ShowTime[]>(this.BASIC_URL + "/showTimeTheatre/" + theatreName);
  }

  public getShowTimeById(id: number) {
    return this.http.get<ShowTime>(this.BASIC_URL + "/showTimeDetails/" + id);
  }
}
