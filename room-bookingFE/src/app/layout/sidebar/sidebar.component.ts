import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  /** Controls mobile overlay visibility from parent */
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  readonly menuItems: MenuItem[] = [
    { label: 'Dashboard',     icon: 'dashboard',     route: '/dashboard' },
    { label: 'Find Room',     icon: 'meeting_room',  route: '/find-room' },
    { label: 'My Bookings',   icon: 'event',         route: '/my-bookings' },
    { label: 'AI Suggestions',icon: 'psychology',    route: '/ai-suggestions' },
    { label: 'Profile',       icon: 'person',        route: '/profile' },
  ];

  readonly bottomItems: MenuItem[] = [
    { label: 'Settings', icon: 'settings', route: '/settings' },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  close(): void {
    this.isOpen = false;
    this.isOpenChange.emit(false);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
    this.close();
  }
}
