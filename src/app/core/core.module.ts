import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [
	  NavbarComponent,
	  LoginComponent
  ],
  entryComponents: [LoginComponent],
  exports: [NavbarComponent]
})
export class CoreModule { }
