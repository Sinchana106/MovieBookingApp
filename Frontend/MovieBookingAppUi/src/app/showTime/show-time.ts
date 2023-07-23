import { Movie } from "../_classes/movie";
import { Theatre } from "../_classes/theatre";


export class ShowTime {
    constructor(public id: number, public movie: Movie, public theatre: Theatre, public showTime: any, public pricePerTicket: number,
        public totalNoOfTickets: number, public availableTickets: number,
        public noOfTicketsBooked: string[], public ticketStatus: string) { }
}
