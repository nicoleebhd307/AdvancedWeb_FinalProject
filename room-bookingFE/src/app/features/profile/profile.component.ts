import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: false,
  template: `
    <div class="flex items-center justify-center h-full min-h-[60vh]">
      <h1 class="heading-lg text-[#1e293b]">Profile</h1>
    </div>
  `,
})
export class ProfileComponent {}
