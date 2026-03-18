import { Component } from '@angular/core';
import { AppButtonSearchComponent } from '../app-buttons/app-button-search/app-button-search.component';

@Component({
  selector: 'app-search-bar',
  imports: [AppButtonSearchComponent],
  templateUrl: './app-search-bar.component.html',
  styleUrl: './app-search-bar.component.scss',
})
export class AppSearchBarComponent {

}
