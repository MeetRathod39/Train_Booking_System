import { Component } from '@angular/core';
import { TrainService } from '../../services/train';
import { ToastService } from '../../services/toast';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './payment.html',
  styleUrls: ['./payment.css']
})
export class PaymentComponent {

  booking: any;
  train: any;
  totalAmount: number = 0;
  serviceFee: number = 0;

  payMethod: 'card' | 'upi' | 'nb' = 'card';

  cardNumber: string = '';
  cardName: string = '';
  cardExpiry: string = '';
  cardCvv: string = '';
  cardType: string = 'VISA';
  focusCvv: boolean = false;

  upiId: string = '';
  upiVerified: boolean = false;

  selectedBank: string = '';

  paying: boolean = false;
  payError: string = '';

  constructor(
    private trainService: TrainService,
    private toast: ToastService,
    private router: Router
  ) {
    this.booking = this.trainService.pendingBooking;

    if (this.booking) {
      this.train = this.trainService.getTrains().find(t => t.id === this.booking.trainId);
      if (this.train) {
        const base = this.train.price * this.booking.seats.length;
        this.serviceFee = Math.round(base * 0.05);
        this.totalAmount = base + this.serviceFee;
      } else {
        this.toast.error('Train Not Found', 'Could not load train information. Please try booking again.');
        setTimeout(() => this.router.navigate(['/trains']), 2000);
      }
    } else {
      this.toast.warning('No Booking Found', 'Please select your seats before proceeding to payment.');
      setTimeout(() => this.router.navigate(['/trains']), 2000);
    }
  }

  formatCard(event: any) {
    let val = event.target.value.replace(/\D/g, '').substring(0, 16);
    this.cardNumber = val.match(/.{1,4}/g)?.join(' ') || val;
    if (val.startsWith('4'))       this.cardType = 'VISA';
    else if (/^5[1-5]/.test(val)) this.cardType = 'MC';
    else if (val.startsWith('6')) this.cardType = 'RuPay';
    else if (val.startsWith('3')) this.cardType = 'AMEX';
    else                           this.cardType = 'CARD';
  }

  formatExpiry(event: any) {
    let val = event.target.value.replace(/\D/g, '');
    if (val.length >= 2) val = val.substring(0, 2) + '/' + val.substring(2, 4);
    this.cardExpiry = val;
  }

  verifyUpi() {
    if (this.upiId.includes('@')) {
      this.upiVerified = true;
      this.payError = '';
      this.toast.success('UPI Verified', `${this.upiId} is ready to use.`);
    } else {
      this.payError = 'Please enter a valid UPI ID (e.g., name@upi)';
      this.toast.error('Invalid UPI ID', 'UPI ID must contain @ symbol.');
    }
  }

  payNow() {
    this.payError = '';

    if (this.payMethod === 'card') {
      const raw = this.cardNumber.replace(/\s/g, '');
      if (raw.length !== 16)               { this.payError = 'Please enter a valid 16-digit card number.'; return; }
      if (!this.cardName.trim())            { this.payError = 'Please enter the cardholder name.'; return; }
      if (!/^\d{2}\/\d{2}$/.test(this.cardExpiry)) { this.payError = 'Please enter expiry as MM/YY.'; return; }
      if (this.cardCvv.length < 3)          { this.payError = 'Please enter a valid CVV.'; return; }
    } else if (this.payMethod === 'upi') {
      if (!this.upiVerified) { this.payError = 'Please verify your UPI ID first.'; return; }
    } else if (this.payMethod === 'nb') {
      if (!this.selectedBank) { this.payError = 'Please select your bank.'; return; }
    }

    this.paying = true;
    this.toast.info('Processing Payment', 'Please wait while we confirm your booking...');

    setTimeout(() => {
      this.paying = false;
      this.trainService.addBooking(this.booking);
      const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      allBookings.push(this.booking);
      localStorage.setItem('bookings', JSON.stringify(allBookings));
      this.trainService.pendingBooking = null;
      localStorage.removeItem('pendingBooking');
      this.toast.success('Payment Successful! 🎉', 'Your ticket has been booked. Redirecting...');
      setTimeout(() => this.router.navigate(['/ticket']), 1200);
    }, 2200);
  }
}
