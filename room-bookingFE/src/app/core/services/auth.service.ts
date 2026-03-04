import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, StudentProfile, UserWithProfile } from '../models/user.model';

interface LoginResponse {
  token: string;
  user: User;
  profile: StudentProfile | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(tap((res) => this.persistSession(res)));
  }

  googleLogin(email: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/auth/google-login`, { email })
      .pipe(tap((res) => this.persistSession(res)));
  }

  /** Fetch fresh profile from /api/users/me (requires valid token in storage). */
  fetchProfile(): Observable<UserWithProfile> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.getToken()}` });
    return this.http
      .get<UserWithProfile>(`${this.apiUrl}/users/me`, { headers })
      .pipe(
        tap((res) => {
          localStorage.setItem('user', JSON.stringify(res.user));
          localStorage.setItem('profile', JSON.stringify(res.profile));
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('profile');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): User | null {
    return this.parseLocal<User>('user');
  }

  getCurrentProfile(): StudentProfile | null {
    return this.parseLocal<StudentProfile>('profile');
  }

  // ─── helpers ────────────────────────────────────────────────────────────────

  private persistSession(res: LoginResponse): void {
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));
    localStorage.setItem('profile', JSON.stringify(res.profile));
  }

  private parseLocal<T>(key: string): T | null {
    const raw = localStorage.getItem(key);
    if (!raw || raw === 'null') return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }
}

