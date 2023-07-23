export class TicketDto {
    constructor(public userName:string,
        public seatsBooked:string[],
        public totalPrice:number){}
}
