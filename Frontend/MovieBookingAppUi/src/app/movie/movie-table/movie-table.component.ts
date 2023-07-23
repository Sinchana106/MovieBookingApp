import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/_classes/movie';

@Component({
  selector: 'app-movie-table',
  templateUrl: './movie-table.component.html',
  styleUrls: ['./movie-table.component.css']
})
export class MovieTableComponent implements OnInit {

  displayedColumns = ['movieId', 'movieName', 'language', 'releaseYear'];
  movies: Movie[] = [];
  movie!: Movie;
  isSearchPressed: boolean = false;
  movieName!: string;
  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe((response) => {
      this.movies = response
      console.log(response);
    },
      ((error) => {
        console.log(error)
      })
    );
  }

  updateMovie(movieId: number) {
    this.router.navigate(['/update-movie/', movieId])
  }

  deleteMovie(movieId: number) {
    this.movieService.deleteMovie(movieId).subscribe((response) => {
      console.log(response);
      alert("Movie deleted successfully");
      this.router.navigate(["/view-movie"]);
      location.reload();
    })
  }

  //To Search Movie Entries In Table By Movie Name
  searchMovie(searchData: NgForm) {
    this.movieName = searchData.controls['movieName'].value;
    this.movieService.getMovieByMovieName(this.movieName).subscribe((response) => {
      this.movies = response;
    }, (error) => {
      console.log(error)
    })
  }
}
