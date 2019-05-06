import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HeaderModule } from '../../header/header.module';
import { NgxMaskModule } from 'ngx-mask';
import { LancamentoGerenteComponent } from './lancamento-gerente.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeaderModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [LancamentoGerenteComponent]
})
export class LancamentoGerenteModule { }