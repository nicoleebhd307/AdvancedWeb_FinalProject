import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { FindRoomComponent } from './features/find-room/find-room.component';
import { MyBookingsComponent } from './features/my-bookings/my-bookings.component';
import { AiSuggestionsComponent } from './features/ai-suggestions/ai-suggestions.component';
import { ProfileComponent } from './features/profile/profile.component';
import { SettingsComponent } from './features/settings/settings.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard',      component: DashboardComponent },
      { path: 'find-room',      component: FindRoomComponent },
      { path: 'my-bookings',    component: MyBookingsComponent },
      { path: 'ai-suggestions', component: AiSuggestionsComponent },
      { path: 'profile',        component: ProfileComponent },
      { path: 'settings',       component: SettingsComponent },
    ],
  },
  { path: '**', redirectTo: 'auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
