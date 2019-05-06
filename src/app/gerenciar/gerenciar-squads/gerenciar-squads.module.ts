import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GerenciarSquadsComponent } from './gerenciar-squads.component';
import { HeaderModule } from 'src/app/header/header.module';
import { AppRoutingModule } from 'src/app/app.routing.module';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule, 
    AppRoutingModule,
  ],
  declarations: [GerenciarSquadsComponent]
})
export class GerenciarSquadsModule { }
