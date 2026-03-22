import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { TrainListComponent } from './components/train-list/train-list';
import { BookingComponent } from './components/booking/booking';
import { PaymentComponent } from './components/payment/payment';
import { TicketComponent } from './components/ticket/ticket';
import { MyBookingsComponent } from './components/my-bookings/my-bookings';

export const routes: Routes = [

{ path:'', component:HomeComponent },

{ path:'login', component:LoginComponent },

{ path:'register', component:RegisterComponent },

{ path:'trains', component:TrainListComponent },

{ path:'booking/:id', component:BookingComponent },

{ path:'payment', component:PaymentComponent },

{ path:'ticket', component:TicketComponent },

{ path:'my-bookings', component:MyBookingsComponent }

];