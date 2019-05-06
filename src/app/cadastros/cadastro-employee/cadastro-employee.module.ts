import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroEmployeeComponent } from './cadastro-employee.component';
import { FormsModule } from '@angular/forms';
import { HeaderModule } from '../../header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeaderModule
  ],
  declarations: [CadastroEmployeeComponent]
})
export class CadastroEmployeeModule { }