import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderModule } from 'src/app/header/header.module';
import { AppRoutingModule } from 'src/app/app.routing.module';
import { CadastroUserComponent } from './cadastro-user.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeaderModule, 
    AppRoutingModule,
  ],
  declarations: [CadastroUserComponent]
})
export class CadastroUserModule { }
