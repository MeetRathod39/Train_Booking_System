import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TrainService {

  trains = [
    { id: 1,  name: 'Rajdhani Express',    from: 'Delhi',     to: 'Mumbai',     price: 1200, dep: '16:55', arr: '08:15+1', duration: '15h 20m', image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=2084&auto=format&fit=crop' },
    { id: 2,  name: 'Shatabdi Express',    from: 'Ahmedabad', to: 'Delhi',      price: 900,  dep: '06:25', arr: '19:40',   duration: '13h 15m', image: 'https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?q=80&w=2070&auto=format&fit=crop' },
    { id: 3,  name: 'Duronto Express',     from: 'Mumbai',    to: 'Kolkata',    price: 1500, dep: '23:00', arr: '06:45+2', duration: '31h 45m', image: 'https://images.unsplash.com/photo-1532155283451-d4f10a76f2cd?q=80&w=2070&auto=format&fit=crop' },
    { id: 4,  name: 'Garib Rath Express',  from: 'Ahmedabad', to: 'Jaipur',     price: 700,  dep: '21:30', arr: '05:50+1', duration: '8h 20m',  image: 'https://images.unsplash.com/photo-1510134950-c8ed849f2b80?q=80&w=2070&auto=format&fit=crop' },
    { id: 5,  name: 'Vande Bharat',        from: 'Delhi',     to: 'Varanasi',   price: 1800, dep: '06:00', arr: '14:00',   duration: '8h 00m',  image: 'https://images.unsplash.com/photo-1527684651001-731c474bbb5a?q=80&w=2074&auto=format&fit=crop' },
    { id: 6,  name: 'Humsafar Express',    from: 'Mumbai',    to: 'Delhi',      price: 1350, dep: '11:05', arr: '06:30+1', duration: '19h 25m', image: 'https://images.unsplash.com/photo-1605723517503-3cadb5818a0c?q=80&w=2070&auto=format&fit=crop' },
    { id: 7,  name: 'Tejas Express',       from: 'Chennai',   to: 'Bangalore',  price: 850,  dep: '13:45', arr: '19:30',   duration: '5h 45m',  image: 'https://images.unsplash.com/photo-1519984388953-d2406bc725e1?q=80&w=2070&auto=format&fit=crop' },
    { id: 8,  name: 'Gatimaan Express',    from: 'Delhi',     to: 'Agra',       price: 750,  dep: '08:10', arr: '09:50',   duration: '1h 40m',  image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?q=80&w=2070&auto=format&fit=crop' },
    { id: 9,  name: 'Kerala Express',      from: 'Delhi',     to: 'Trivandrum', price: 1650, dep: '11:40', arr: '08:00+2', duration: '44h 20m', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2070&auto=format&fit=crop' },
    { id: 10, name: 'Deccan Queen',        from: 'Pune',      to: 'Mumbai',     price: 500,  dep: '07:15', arr: '10:25',   duration: '3h 10m',  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop' },
    { id: 11, name: 'Howrah Rajdhani',     from: 'Kolkata',   to: 'Delhi',      price: 1400, dep: '14:05', arr: '09:55+1', duration: '19h 50m', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2844&auto=format&fit=crop' },
    { id: 12, name: 'Mysore Express',      from: 'Bangalore', to: 'Hyderabad',  price: 920,  dep: '22:00', arr: '07:40+1', duration: '9h 40m',  image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2070&auto=format&fit=crop' },
  ];

  bookings: any[] = [];
  pendingBooking: any = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('bookings');
      if (data) this.bookings = JSON.parse(data);
    }
  }

  getTrains() { return this.trains; }

  addBooking(data: any) {
    this.bookings.push(data);
    if (typeof window !== 'undefined') localStorage.setItem('bookings', JSON.stringify(this.bookings));
  }

  getBookings() { return this.bookings; }

  deleteBooking(index: number) {
    this.bookings.splice(index, 1);
    if (typeof window !== 'undefined') localStorage.setItem('bookings', JSON.stringify(this.bookings));
  }
}
