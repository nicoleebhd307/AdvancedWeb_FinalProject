import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

// Layout
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

// Feature pages
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { FindRoomComponent } from './features/find-room/find-room.component';
import { MyBookingsComponent } from './features/my-bookings/my-bookings.component';
import { AiSuggestionsComponent } from './features/ai-suggestions/ai-suggestions.component';
import { ProfileComponent } from './features/profile/profile.component';
import { SettingsComponent } from './features/settings/settings.component';

@NgModule({
  declarations: [
    App,
    SidebarComponent,
    MainLayoutComponent,
    DashboardComponent,
    FindRoomComponent,
    MyBookingsComponent,
    AiSuggestionsComponent,
    ProfileComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    AppRoutingModule,
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
