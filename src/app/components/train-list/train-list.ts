import { Component } from '@angular/core';
import { TrainService } from '../../services/train';
import { ToastService } from '../../services/toast';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-train-list',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, FormsModule],
  templateUrl: './train-list.html',
  styleUrls: ['./train-list.css']
})
export class TrainListComponent {

  trains: any[] = [];
  filteredTrains: any[] = [];

  from = '';
  to = '';
  date = '';
  today = new Date().toISOString().split('T')[0]; // min date for input

  constructor(
    private trainService: TrainService,
    private toast: ToastService
  ) {
    this.trains = this.trainService.getTrains();
    this.filteredTrains = this.trains;
  }

  search() {
    // Date validation
    if (this.date) {
      const selected = new Date(this.date);
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      if (selected < now) {
        this.toast.error('Invalid Date', 'Travel date cannot be in the past. Please select today or a future date.');
        return;
      }
    }

    this.filteredTrains = this.trains.filter(t =>
      t.from.toLowerCase().includes(this.from.toLowerCase()) &&
      t.to.toLowerCase().includes(this.to.toLowerCase())
    );

    if (this.filteredTrains.length === 0) {
      this.toast.warning('No Trains Found', 'Try different city names or clear the filters.');
    } else {
      this.toast.success(`${this.filteredTrains.length} Train${this.filteredTrains.length > 1 ? 's' : ''} Found`, 'Select a train to book your seats.');
    }
  }
}
