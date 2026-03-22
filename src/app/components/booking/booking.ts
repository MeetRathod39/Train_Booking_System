import { Component, OnInit } from '@angular/core';
import { TrainService } from '../../services/train';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector:'app-booking',
  standalone:true,
  imports:[NgFor, NgClass, NgIf, FormsModule],
  templateUrl:'./booking.html',
  styleUrls: ['./booking.css']
})
export class BookingComponent implements OnInit {
  
  trainId:number=0;
  seats:any[]=[];
  selectedSeats:number[]=[];
  
  passengers: any[] = [];
  passengerName: string = '';
  passengerAge: number | null = null;
  passengerGender: string = '';
  
  errorMsg: string = '';
  previouslyBookedSeats: number[] = [];

  constructor(
    private trainService:TrainService,
    private route:ActivatedRoute,
    private router:Router
  ){}

  ngOnInit(){
    this.trainId = Number(this.route.snapshot.paramMap.get('id'));

    // Fetch previously booked seats for this train
    const allBookings = this.trainService.getBookings();
    const bookingsForThisTrain = allBookings.filter(b => b.trainId === this.trainId);
    
    bookingsForThisTrain.forEach(booking => {
      this.previouslyBookedSeats.push(...booking.seats);
    });

    for(let i=1; i<=40; i++){
      this.seats.push({
        seatNumber: i,
        selected: false,
        unavailable: this.previouslyBookedSeats.includes(i)
      });
    }
  }

  toggleSeat(seat:any){
    if(seat.unavailable) return; // Prevent selection of booked seats
    
    // Check limit matching passengers list length initially.
    // If not matching perfectly, wait until submission to throw error. 
    // We just toggle it here.
    seat.selected = !seat.selected;
    if(seat.selected){
      this.selectedSeats.push(seat.seatNumber);
    }else{
      this.selectedSeats = this.selectedSeats.filter(s => s!==seat.seatNumber);
    }
    this.errorMsg = '';
  }
  
  addPassenger() {
    if (this.passengerName && this.passengerAge && this.passengerGender) {
      this.passengers.push({
        name: this.passengerName,
        age: this.passengerAge,
        gender: this.passengerGender
      });
      this.passengerName = '';
      this.passengerAge = null;
      this.passengerGender = '';
      this.errorMsg = '';
    } else {
      this.errorMsg = 'Please fill all passenger details.';
    }
  }
  
  removePassenger(index: number) {
    this.passengers.splice(index, 1);
    this.errorMsg = '';
  }

  book(){
    if(this.selectedSeats.length === 0){
      this.errorMsg = "Please select at least one seat.";
      return;
    }
    
    if (this.passengers.length === 0) {
      this.errorMsg = "Please add at least one passenger.";
      return;
    }

    if (this.selectedSeats.length !== this.passengers.length) {
      this.errorMsg = `Mismatch: You selected ${this.selectedSeats.length} seats but added ${this.passengers.length} passengers.`;
      return;
    }

    this.trainService.pendingBooking={
      trainId: this.trainId,
      seats: this.selectedSeats,
      passengers: this.passengers
    };
    
    this.router.navigate(['/payment']);
  }

}