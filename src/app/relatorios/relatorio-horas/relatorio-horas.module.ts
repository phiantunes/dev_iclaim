import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RelatorioHorasComponent } from './relatorio-horas.component';
import { HeaderModule } from 'src/app/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeaderModule,
  ],
  declarations: [RelatorioHorasComponent]
})
export class RelatorioHorasModule { }