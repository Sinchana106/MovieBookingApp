import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ShowTimeService } from '../services/show-time.service';
import { ShowTime } from '../showTime/show-time';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  theatreName!: string;
  id: number = 1;
  movieName!: string;
  showTimeDetails: ShowTime[] = [];
  displayedColumns = ['id', 'movieName', 'language', 'releaseYear', 
  'theatreName', 'address', 'showTime', 'pricePerTicket',
  'availableTickets', 'ticketStatus', 'action'];

  constructor(private showTimeService: ShowTimeService, private router: Router) { }

  //To display Showtime Details In The Table
  ngOnInit(): void {
    this.showTimeService.getAllShowTimeDetails().subscribe((response) => {
      this.showTimeDetails = response;
    });
  }

  //To Search Showtime Details By MovieName
  searchMovie(searchForm: NgForm) {
    this.movieName = searchForm.controls['movieName'].value;
    this.showTimeService.getAllShowTimeDetailsByMovieName(this.movieName).subscribe((response) => {
      console.log(response)
      this.showTimeDetails = response;
    })
  }

  //To Search Showtime Details By TheatreName
  searchTheatre(searchForm: NgForm) {
    this.theatreName = searchForm.controls['theatreName'].value;
    this.showTimeService.getAllShowTimeDetailsByTheatreName(this.theatreName).subscribe((response) => {
      console.log(response);
      this.showTimeDetails = response;
    }, (error) => {
      console.log(error)
    })
  }

  //To Navigate To Ticket Booking Component
  bookTicket(id: number) {
    this.router.navigate(["/ticket-book/", id])
  }
}
