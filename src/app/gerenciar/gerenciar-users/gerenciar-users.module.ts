import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GerenciarUsersComponent } from './gerenciar-users.component';
import { HeaderModule } from 'src/app/header/header.module';
import { AppRoutingModule } from 'src/app/app.routing.module';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule, 
    AppRoutingModule,
  ],
  declarations: [GerenciarUsersComponent]
})
export class GerenciarUsersModule { }
