import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
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