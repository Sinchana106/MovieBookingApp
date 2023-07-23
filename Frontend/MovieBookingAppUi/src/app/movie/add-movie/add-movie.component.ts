import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalSuccessComponent } from 'src/app/modal-success/modal-success.component';
import { DataTransferService } from 'src/app/services/data-transfer.service';

import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/_classes/movie';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  constructor(private movieService: MovieService,
    private dialog: MatDialog,
    private router: Router,
    private dataTransfer: DataTransferService) { }

  ngOnInit(): void {
  }

  movie!: Movie;

  //save(movieData: NgForm)=> It is used to add Movie to database
  save(movieData: NgForm) {

    this.movieService.addMovie(movieData).subscribe((response) => {
      console.log(response);
      this.movie = response;
      this.dataTransfer.data = "Movie with ID: " + this.movie.movieId + " and Name: " + this.movie.movieName + " is Added Succesfully!";
      //alert
      this.openModalSuccess();
      this.router.navigate(["/view-movie"]);
    }, ((error) => {
      console.log(error);
    }
    ));

  }

  //To Display Success Dialog Box On succesfully adding movie details
  openModalSuccess(): void {
    this.dialog.open(ModalSuccessComponent, {
      width: '400px',
    });
  }


}
