import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShowTimeService } from '../services/show-time.service';
import { ShowTime } from '../showTime/show-time';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private showTimeService: ShowTimeService) { }
  theatreName!: string;
  movieName!: string;
  showTimeDetails: ShowTime[] = [];
  displayedColumns = ['id', 'movieId', 'movieName', 'language', 'releaseYear', 
  'theatreId', 'theatreName', 'address', 'noOfSeats', 'showTime', 'pricePerTicket',
   'totalNoOfTickets', 'availableTickets', 'ticketStatus'];


  ngOnInit(): void {
    /*
     * To Fetch All The ShowTime Details and store it in the datasource of mat-table
     */
    this.showTimeService.getAllShowTimeDetails().subscribe((response) => {
      this.showTimeDetails = response;
      console.log(this.showTimeDetails[0].ticketStatus)
    })
  }

  /*
  *  Code To search all the showtime deatils by movieName 
  */
  searchMovie(searchForm: NgForm) {
    this.movieName = searchForm.controls['movieName'].value;
    this.showTimeService.getAllShowTimeDetailsByMovieName(this.movieName).subscribe((response) => {
      console.log(response)
      this.showTimeDetails = response;
    })
  }

  /*
  *  Code To search all the showtime deatils by theatreName
  */
  searchTheatre(searchForm: NgForm) {
    this.theatreName = searchForm.controls['theatreName'].value;
    this.showTimeService.getAllShowTimeDetailsByTheatreName(this.theatreName).subscribe((response) => {
      console.log(response);
      this.showTimeDetails = response;
    }, (error) => {
      console.log(error)
    })
  }

}







