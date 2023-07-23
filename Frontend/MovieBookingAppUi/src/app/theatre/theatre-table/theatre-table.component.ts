import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TheatreService } from 'src/app/services/theatre.service';


@Component({
  selector: 'app-theatre-table',
  templateUrl: './theatre-table.component.html',
  styleUrls: ['./theatre-table.component.css']
})
export class TheatreTableComponent implements OnInit {

  constructor(private theatreService: TheatreService) { }

  theatreName!: string;
  displayedColumns = ["theatreId", "theatreName", "address", "noOfSeats"];
  theatres: any;

  //To Display All The Theatre Details
  ngOnInit(): void {
    this.theatreService.getAllTheatres().subscribe((data) => {
      this.theatres = data;
      console.log(this.theatres);
    });
  }

  //To Search Theatre Details By Theatre Name
  searchTheatre(searchForm: NgForm) {
    this.theatreName = searchForm.controls['theatreName'].value;
    this.theatreService.getTheatreByTheatreName(this.theatreName).subscribe((response) => {
      console.log(response);
      this.theatres = response;
    }, (error) => {
      console.log(error)
    })
  }

}
