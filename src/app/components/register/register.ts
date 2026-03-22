import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  errorMsg = '';

  constructor(private router: Router, private toast: ToastService) {}

  register() {
    if (this.name.trim() && this.email.includes('@') && this.password.length >= 3) {
      this.toast.success('Account Created! 🎉', 'Welcome to RailX. Please sign in to continue.');
      setTimeout(() => this.router.navigate(['/login']), 1500);
    } else {
      this.errorMsg = 'Please fill all fields correctly. Email must contain "@" and password ≥ 3 characters.';
      this.toast.error('Registration Failed', this.errorMsg);
    }
  }
}
