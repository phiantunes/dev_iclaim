import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LancamentoHorasComponent } from './lancamento-horas.component';
import { FormsModule } from '@angular/forms';
import { HeaderModule } from '../../header/header.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeaderModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [LancamentoHorasComponent]
})
export class LancamentoHorasModule { }