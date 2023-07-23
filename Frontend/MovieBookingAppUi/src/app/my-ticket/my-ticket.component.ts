import { Component, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket.service';
import { Ticket } from '../ticket/ticket';

@Component({
  selector: 'app-my-ticket',
  templateUrl: './my-ticket.component.html',
  styleUrls: ['./my-ticket.component.css']
})
export class MyTicketComponent implements OnInit {

  constructor(private ticketService: TicketService) { }

  displayedColumns = ['ticketId', 'id', 'movieName', 'language', 'releaseYear', 'theatreName', 'address', 'showTime', 'pricePerTicket', 'seatsBooked', 'totalPrice', 'ticketBookedDateTime'];
  tickets: Ticket[] = [];

  //To Fetch A List Of Tickets That Was Booked By The Respective Customer 
  ngOnInit(): void {
    const userName = localStorage.getItem('userName');
    this.ticketService.myTickets(userName!).subscribe((data) => {
      this.tickets = data;
    }, (error) => {
      console.log(error);
    })
  }

}
