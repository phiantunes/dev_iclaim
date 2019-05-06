import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from 'src/app/header/header.module';
import { AppRoutingModule } from 'src/app/app.routing.module';
import { GerenciarComunidadesComponent } from './gerenciar-comunidades.component';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule, 
    AppRoutingModule,
  ],
  declarations: [GerenciarComunidadesComponent]
})
export class GerenciarComunidadesModule { }
