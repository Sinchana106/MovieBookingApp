import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Theatre } from '../_classes/theatre';


@Injectable({
  providedIn: 'root'
})
export class TheatreService {

  constructor(private http: HttpClient) { }

  BASIC_URL = "http://localhost:8080/api/v1.0/moviebooking";

  public addTheatre(theatreData: NgForm) {
    return this.http.post(this.BASIC_URL + "/theatre", theatreData.value);
  }

  public getAllTheatres() {
    return this.http.get(this.BASIC_URL + "/theatres");
  }

  public getTheatreById(theatreId: number) {
    return this.http.get<Theatre>(this.BASIC_URL + "/theatre/" + theatreId);
  }

  public getTheatreByTheatreName(theatreName: string) {
    return this.http.get<Theatre[]>(this.BASIC_URL + "/theatreDetails/" + theatreName);
  }
}
