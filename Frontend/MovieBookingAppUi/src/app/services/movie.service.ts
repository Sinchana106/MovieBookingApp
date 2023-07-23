import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../_classes/movie';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  BASIC_URL = "http://localhost:8080/api/v1.0/moviebooking";
  
  constructor(private http: HttpClient) { }

  public getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.BASIC_URL + "/all");
  }

  public getMovieById(movieId: number): Observable<Movie> {
    return this.http.get<Movie>(this.BASIC_URL + "/movies/" + movieId);
  }

  public getMovieByMovieName(movieName: string) {
    return this.http.get<Movie[]>(this.BASIC_URL + "/movies/search/" + movieName);
  }

  public addMovie(movie: any): Observable<Movie> {
    return this.http.post<Movie>(this.BASIC_URL + "/addMovie", movie);
  }

  public deleteMovie(movieId: number): Observable<string> {
    return this.http.delete<string>(this.BASIC_URL + "/delete/" + movieId);
  }

  public updateMovie(movie: Movie, movieId: number) {
    return this.http.put(this.BASIC_URL + "/updateMovie/" + movieId, movie);
  }
}
