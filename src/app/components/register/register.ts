import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        // Add a custom validator to the whole form to check if passwords match
        validators: this.passwordMatchValidator,
      }
    );
  }

  // Custom validator function
  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    // Return an error object if they don't match, otherwise return null
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return; // Stop if the form has errors
    }

    this.loading = true;
    const { firstName, lastName, username, email, password } = this.registerForm.value;

    this.authService.register({ firstName, lastName, username, email, password }).subscribe({
      next: () => {
        this.toastr.success('Registration successful! Please login.', 'Success');
        this.router.navigate(['/login']);
      },
      error: () => {
        this.toastr.error('Registration failed. Please try again.', 'Error');
        this.loading = false;
      },
    });
  }
}
