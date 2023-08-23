import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { authGuardGuard } from './guards/auth-guard.guard';
import { loggedoutGuardGuard } from './guards/loggedout-guard.guard';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate:[loggedoutGuardGuard]
  },
  {
    path: 'employee',
    loadChildren:()=>
    import('./employee/employee.module').then((m)=>m.EmployeeModule),
    canActivate:[authGuardGuard]
  },
  {
    path: '**',
    component: NotFoundComponent,
  },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}