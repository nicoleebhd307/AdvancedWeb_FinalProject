import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { User, StudentProfile } from '../../core/models/user.model';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  user: User | null = null;
  profile: StudentProfile | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.profile = this.authService.getCurrentProfile();
  }

  get displayName(): string {
    return this.profile?.fullName ?? this.user?.email ?? 'User';
  }

  get displaySub(): string {
    return this.profile?.major ?? this.user?.role ?? '';
  }

  get avatarUrl(): string {
    return this.profile?.avatarUrl ?? 'https://i.pravatar.cc/150?img=0';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  avatarFallback(event: Event): void {
    (event.target as HTMLImageElement).src = 'https://i.pravatar.cc/150?img=0';
  }
}
