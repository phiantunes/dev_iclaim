import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { AppRoutingModule } from '../app.routing.module';
import { HeaderModule } from '../header/header.module';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    HeaderModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }