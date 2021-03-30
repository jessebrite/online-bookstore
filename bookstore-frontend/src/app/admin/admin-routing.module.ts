import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminAddComponent } from './admin-add/admin-add.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';

const routes: Routes = [
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'addBook', component: AdminAddComponent },
  { path: 'editBook/:id', component: AdminEditComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
