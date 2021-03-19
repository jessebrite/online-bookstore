import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookDetailsComponent } from '@components/book-details/book-details.component';
import { BookListComponent } from '@components/book-list/book-list.component';
import { PageNotFoundComponent } from '@components/page-not-found/page-not-found.component';
import { CartDetailsComponent } from '@components/cart-details/cart-details.component';
import { CheckoutComponent } from '@components/checkout/checkout.component';
import { RegisterComponent } from '@components/register/register.component';
import { LoginComponent } from '@components/login/login.component';
import { AboutComponent } from '@components/about/about.component';
import { ContactComponent } from '@components/contact/contact.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { Role } from '@common/role.enum';

const routes: Routes = [
  { path: 'books/:id', component: BookDetailsComponent },
  { path: 'search/:keyword', component: BookListComponent },
  { path: 'category/:id', component: BookListComponent },
  { path: 'cart-details', component: CartDetailsComponent },
  { path: 'books', component: BookListComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AdminGuard],
    data: { roles: Role.ADMIN },
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
