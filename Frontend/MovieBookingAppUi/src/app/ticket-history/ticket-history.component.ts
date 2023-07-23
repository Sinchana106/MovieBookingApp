import { Component, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket.service';
import { Ticket } from '../ticket/ticket';

@Component({
  selector: 'app-ticket-history',
  templateUrl: './ticket-history.component.html',
  styleUrls: ['./ticket-history.component.css']
})
export class TicketHistoryComponent implements OnInit {

  constructor(private ticketService: TicketService) { }

  tickets: Ticket[] = [];
  displayedColumns = ['ticketId', 'id', 'movieName', 'language', 'releaseYear',
   'theatreName', 'address', 'showTime', 'pricePerTicket', 'userName',
    'seatsBooked', 'totalPrice', 'ticketBookedDateTime'];
  
  //To Display Ticket Table
  ngOnInit(): void {
    this.ticketService.allTickets().subscribe((response) => {
      console.log(response);
      this.tickets = response;
    }, (error) => {
      console.log(error)
    })
  }

}
