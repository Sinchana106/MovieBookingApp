import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../ticket/ticket';
import { TicketDto } from '../ticket/ticket-dto';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  data: any;

  constructor(private http: HttpClient) { }

  BASIC_URL = 'http://localhost:8080/api/v1.0/moviebooking';
  
  public saveTicket(id: number, ticket: TicketDto) {
    return this.http.post(this.BASIC_URL + "/ticket/" + id, ticket);
  }

  public myTickets(userName: string) {
    return this.http.get<Ticket[]>(this.BASIC_URL + "/ticket/" + userName);
  }

  public allTickets() {
    return this.http.get<Ticket[]>(this.BASIC_URL + "/tickets");
  }
}
