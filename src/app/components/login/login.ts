import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMsg = '';

  constructor(private router: Router) {}

  login() {
    if (this.username && this.password.length >= 3) {
      if (this.username === 'admin' || this.username.includes('@')) {
        localStorage.setItem('user', this.username);
        this.router.navigate(['/trains']);
      } else {
        this.errorMsg = "Please enter a valid email or use 'admin'";
      }
    } else {
      this.errorMsg = 'Invalid credentials. Please fill in all fields.';
    }
  }
}
