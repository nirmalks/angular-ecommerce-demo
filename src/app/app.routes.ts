import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CartComponent } from './cart/cart.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
      pathMatch: "full"
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "products",
    loadChildren: () => import('./products-module/products-module.module').then(m => m.ProductsModuleModule),
    canLoad: [authGuard]
  },
  {
    path: "cart",
    component: CartComponent,
    canActivate: [authGuard],
  },
  {
    path: "**",
    component: PageNotFoundComponent
  },
];
