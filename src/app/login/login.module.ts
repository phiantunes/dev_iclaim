import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogInComponent } from './login.component';
import { AppRoutingModule } from '../app.routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [LogInComponent]
})
export class LogInModule { }