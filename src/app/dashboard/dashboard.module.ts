import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule  }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { SharedComponentModule } from '../shared-component/shared-component.module';
import { AuthModule } from '../auth/auth.module';
import { PurchasesComponent } from './purchases/purchases.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PurchasesComponent
  ],
  imports: [
    DashboardRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSkeletonLoaderModule,
    CommonModule,
    SharedComponentModule
  ],
  providers: [],
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }
