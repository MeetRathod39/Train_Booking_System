import { Component } from '@angular/core';
import { TrainService } from '../../services/train';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './my-bookings.html',
  styleUrls: ['./my-bookings.css']
})
export class MyBookingsComponent {

  bookings: any[] = [];
  displayBookings: any[] = [];

  constructor(private trainService: TrainService) {
    this.bookings = this.trainService.getBookings();
    this.mapBookings();
  }

  mapBookings() {
    const trains = this.trainService.getTrains();
    this.displayBookings = this.bookings.map(b => {
      const t = trains.find(train => train.id == b.trainId);
      return { ...b, train: t };
    });
  }

  deleteBooking(i: number) {
    this.trainService.deleteBooking(i);
    this.bookings = this.trainService.getBookings();
    this.mapBookings();
  }
}
