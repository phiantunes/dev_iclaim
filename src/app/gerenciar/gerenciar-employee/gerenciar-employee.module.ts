import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from 'src/app/header/header.module';
import { AppRoutingModule } from 'src/app/app.routing.module';
import { GerenciarEmployeeComponent } from './gerenciar-employee.component';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule, 
    AppRoutingModule,
  ],
  declarations: [GerenciarEmployeeComponent]
})
export class GerenciarEmployeeModule { }
