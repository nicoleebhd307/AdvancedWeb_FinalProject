import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

declare const google: any;

const UEL_EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@uel\.edu\.vn$/;

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage = '';
  isLoading = false;
  isGoogleLoading = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(UEL_EMAIL_PATTERN),
        ],
      ],
      password: ['', [Validators.required]],
    });

    this.initGoogleSignIn();
  }

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  get isFormInvalid(): boolean {
    return this.loginForm.invalid;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage =
          err?.error?.message ?? 'An unexpected error occurred. Please try again.';
      },
    });
  }

  triggerGoogleSignIn(): void {
    if (typeof google === 'undefined') {
      this.errorMessage = 'Google Sign-In is not available. Please try again later.';
      return;
    }
    google.accounts.id.prompt();
  }

  private initGoogleSignIn(): void {
    if (typeof google === 'undefined') return;

    google.accounts.id.initialize({
      client_id: 'YOUR_GOOGLE_CLIENT_ID',
      callback: (response: any) => this.handleGoogleCallback(response),
    });
  }

  private handleGoogleCallback(response: any): void {
    this.ngZone.run(() => {
      try {
        const credential: string = response.credential;
        // Decode JWT payload (base64) — no library needed for mock
        const payload = JSON.parse(atob(credential.split('.')[1]));
        const email: string = payload.email ?? '';

        if (!UEL_EMAIL_PATTERN.test(email)) {
          this.errorMessage = 'Only @uel.edu.vn Google accounts are allowed.';
          return;
        }

        this.isGoogleLoading = true;
        this.errorMessage = '';

        this.authService.googleLogin(email).subscribe({
          next: () => {
            this.isGoogleLoading = false;
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            this.isGoogleLoading = false;
            this.errorMessage =
              err?.error?.message ?? 'Google login failed. Please try again.';
          },
        });
      } catch {
        this.errorMessage = 'Failed to process Google credential.';
      }
    });
  }
}

