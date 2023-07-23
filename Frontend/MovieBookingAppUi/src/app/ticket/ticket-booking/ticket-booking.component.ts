import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import { ShowTimeService } from 'src/app/services/show-time.service';
import { ShowTime } from 'src/app/showTime/show-time';
import { TicketDto } from '../ticket-dto';
import { MatDialog } from '@angular/material/dialog';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { ModalSuccessComponent } from 'src/app/modal-success/modal-success.component';

@Component({
  selector: 'app-ticket-booking',
  templateUrl: './ticket-booking.component.html',
  styleUrls: ['./ticket-booking.component.css']
})
export class TicketBookingComponent implements OnInit {

  constructor(private showTimeService: ShowTimeService,
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private router: Router,
    private dialog: MatDialog,
    private dataTransfer: DataTransferService) { }

  showTime!: ShowTime;
  id!: number;
  movieTitle: string = '';
  screen: string = '';
  time: any;
  ticketDetails!: any;
  price!: number;
  tick!: number;
  conv!: number;
  rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  cols: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  total!: number;
  reserved: string[] = [];
  selected: string[] = [];
  userName: any;
  ticketPrice!: number;
  convFee: number = 30;
  totalPrice: number = 0;
  currency: string = "Rs";
  ticketId!: number;

  //To Fetch ShowTime Details By ID
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.showTimeService.getShowTimeById(this.id).subscribe((response) => {
      this.showTime = response;
      this.movieTitle = this.showTime.movie.movieName;
      this.screen = this.showTime.theatre.theatreName;
      this.time = this.showTime.showTime;
      this.ticketPrice = this.showTime.pricePerTicket;
      this.reserved = this.showTime.noOfTicketsBooked;
      console.log(this.showTime);
      console.log(this.ticketPrice);
    })

  }


  // To Get The Status Of Seats Whether It is Reserved/Available/Selected
  getStatus(seatPos: string) {
    if (this.reserved.indexOf(seatPos) !== -1) {
      return 'reserved';
    } else if (this.selected.indexOf(seatPos) !== -1) {
      return 'selected';
    }
    return "ok";
  }

  //To Clear The Selected Seats On Pressing Clear Button
  clearSelected() {
    this.selected = [];
  }

  seatClicked(seatPos: string) {
    var index = this.selected.indexOf(seatPos);

    if (index !== -1) {
      // seat already selected, remove
      this.selected.splice(index, 1)
    } else {
      //push to selected array only if it is not reserved
      if (this.reserved.indexOf(seatPos) === -1)
        this.selected.push(seatPos);
    }

  }

  //Buy button handler
  showSelected() {
    console.log("show selected clicked");
    if (this.selected.length > 0) {
      this.price = this.ticketPrice * this.selected.length;
      this.conv = this.convFee;
      this.total = this.price + this.conv;
      this.userName = localStorage.getItem('userName');
      let ticket = new TicketDto(this.userName, this.selected, this.total);
      this.ticketService.saveTicket(this.id, ticket).subscribe((response) => {
        console.log(response);
        this.dataTransfer.data = "Ticket is booked succesfully, Enjoy your movie!";
        this.openModalSuccess();
        this.router.navigate(['/user'])
      })
      console.log(ticket);
    } else {
      alert("No seats selected!");
    }
  }

  openModalSuccess(): void {
    this.dialog.open(ModalSuccessComponent, {
      width: '400px',
    });
  }
}
