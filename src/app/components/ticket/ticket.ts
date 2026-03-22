import { Component } from '@angular/core';
import { TrainService } from '../../services/train';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor],
  templateUrl: './ticket.html',
  styleUrls: ['./ticket.css']
})
export class TicketComponent {

  booking: any;
  train: any;
  pnr: string = '';

  constructor(private trainService: TrainService) {
    const bookings = this.trainService.getBookings();
    if (bookings.length > 0) {
      this.booking = bookings[bookings.length - 1];
      this.train = this.trainService.getTrains().find(t => t.id == this.booking.trainId);
    }
    // Generate a PNR
    this.pnr = Math.floor(1000000000 + Math.random() * 9000000000).toString();
  }
}
