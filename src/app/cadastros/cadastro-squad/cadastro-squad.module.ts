import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroSquadComponent } from './cadastro-squad.component';
import { FormsModule } from '@angular/forms';
import { HeaderModule } from '../../header/header.module';
import { AppRoutingModule } from '../../app.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeaderModule,
    AppRoutingModule
  ],
  declarations: [CadastroSquadComponent]
})
export class CadastroSquadModule { }