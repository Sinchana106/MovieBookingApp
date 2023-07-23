import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Theatre } from 'src/app/_classes/theatre';
import { MovieService } from 'src/app/services/movie.service';
import { TheatreService } from 'src/app/services/theatre.service';
import { ShowTimeService } from 'src/app/services/show-time.service';
import { Movie } from 'src/app/_classes/movie';
import { ModalSuccessComponent } from 'src/app/modal-success/modal-success.component';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponentComponent } from 'src/app/modal-component/modal-component.component';

@Component({
  selector: 'app-add-showtime',
  templateUrl: './add-showtime.component.html',
  styleUrls: ['./add-showtime.component.css']
})
export class AddShowtimeComponent implements OnInit {

  constructor(private movieService: MovieService,
    private theatreService: TheatreService,
    private showTimeService: ShowTimeService,
    private router: Router,
    private dialog: MatDialog,
    private dataTransfer: DataTransferService) { }

  movie!: Movie;
  theatre!: Theatre;
  moviePresent = false;
  theatrePresent = false;
  ngOnInit(): void {

  }

  //To Retrieve Movie Details By Passing Movie Id
  retrieveMovieByID(form: NgForm) {
    console.log(form.controls['movieId'].value)
    this.movieService.getMovieById(form.controls['movieId'].value).subscribe((response) => {
      console.log(response);
      this.movie = response;
      if (this.movie !== null) {
        this.moviePresent = true;
        this.dataTransfer.data = "Movie Id:" + form.controls['movieId'].value + " is verified";
        // this.openModalSuccess();
      } else {
        this.moviePresent = false;
        //alert("Movie Id doesnot exist")
        this.dataTransfer.data = "MovieId Id:" + form.controls['movieId'].value + " doesnot exist!"
        this.openModalError();
        form.controls['movieId'].setErrors({ movieIdDoesnotExist: true });
      }
    }, (error) => {
      console.log(error);
    });
  }

   //To Retrieve Theatre Details By Passing Theatre Id
  retrieveTheatreByID(form: NgForm) {
    this.theatreService.getTheatreById(form.controls['theatreId'].value).subscribe((response) => {
      console.log(response);
      this.theatre = response;
      if (this.theatre != null) {
        this.theatrePresent = true;
        this.dataTransfer.data = "Theatre Id:" + form.controls['theatreId'].value + " is verified";
        //this.openModalSuccess();
      } else {
        this.theatrePresent = false;
        this.dataTransfer.data = "Theatre Id:" + form.controls['theatreId'].value + " doesnot exist!"
        this.openModalError();
        form.controls['theatreId'].setErrors({ theatreIdDoesnotExist: true });
      }
    }
      ,
      (error) => {
        console.log(error);
      });
  }

  //To Save Showtime Details
  save(addShowTime: NgForm) {
    console.log(addShowTime);
    this.showTimeService.addShowTime(addShowTime).subscribe((response) => {
      console.log(response);
      this.dataTransfer.data = "ShowTime details are added succesfully";
      this.openModalSuccess();
      this.router.navigate(['/admin'])
    })
  }

  openModalSuccess(): void {
    this.dialog.open(ModalSuccessComponent, {
      width: '400px',
    });
  }

  openModalError(): void {
    this.dialog.open(ModalComponentComponent, {
      width: '400px',
    });
  }
}
