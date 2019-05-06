import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app.routing.module';
import { PerfilComponent } from './perfil.component';
import { HeaderModule } from 'src/app/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    HeaderModule
  ],
  declarations: [PerfilComponent]
})
export class PerfilModule { }