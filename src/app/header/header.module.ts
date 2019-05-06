import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header.component';
import { AppRoutingModule } from '../app.routing.module';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [HeaderComponent]
})
export class HeaderModule { }