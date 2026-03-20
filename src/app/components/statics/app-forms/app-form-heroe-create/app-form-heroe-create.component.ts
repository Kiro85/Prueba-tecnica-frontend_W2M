import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AppButtonCreateFormComponent } from '../../../dynamics/app-buttons/app-button-create-form/app-button-create-form.component';

@Component({
  selector: 'app-form-heroe-create',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    AppButtonCreateFormComponent
  ],
  templateUrl: './app-form-heroe-create.component.html',
  styleUrl: './app-form-heroe-create.component.scss',
})
export class AppFormHeroeCreateComponent {

}
