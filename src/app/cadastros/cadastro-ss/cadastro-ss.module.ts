import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroSSComponent } from './cadastro-ss.component';
import { FormsModule } from '@angular/forms';
import { HeaderModule } from '../../header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeaderModule,
  ],
  declarations: [CadastroSSComponent]
})
export class CadastroSSModule { }