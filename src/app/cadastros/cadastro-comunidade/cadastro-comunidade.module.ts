import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderModule } from 'src/app/header/header.module';
import { AppRoutingModule } from 'src/app/app.routing.module';
import { CadastroComunidadeComponent } from './cadastro-comunidade.component';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HeaderModule, 
    AppRoutingModule,
  ],
  declarations: [CadastroComunidadeComponent]
})
export class CadastroComunidadeModule { }
