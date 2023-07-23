import { ShowTime } from "../showTime/show-time";

export class Ticket {
    constructor(public ticketId:number,
        public showTime:ShowTime,
        public userName:string,
        public seatsBooked:string[],
        public totalPrice:number,
        public ticketBookedDateTime:string){}
}
