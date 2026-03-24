import { Component } from '@angular/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  imports: [MatProgressSpinner],
  templateUrl: './app-spinner.component.html',
  styleUrl: './app-spinner.component.scss',
})
export class AppSpinnerComponent {}
