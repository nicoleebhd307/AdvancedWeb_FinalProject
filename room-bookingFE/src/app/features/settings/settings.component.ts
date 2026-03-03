import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  standalone: false,
  template: `
    <div class="flex items-center justify-center h-full min-h-[60vh]">
      <h1 class="heading-lg text-[#1e293b]">Settings</h1>
    </div>
  `,
})
export class SettingsComponent {}
