import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    NavbarComponent,
    FooterComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
