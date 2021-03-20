import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [AdminComponent, AdminDashboardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    NgbModule,
    NgxSpinnerModule,
    NgbPaginationModule,
  ],
})
export class AdminModule {}
