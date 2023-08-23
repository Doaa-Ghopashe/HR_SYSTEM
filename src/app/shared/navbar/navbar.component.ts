import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  username!:string;
  isloggedin!:boolean;
  isloggedout!:boolean;
  constructor(private authService:AuthService){}
  
  ngOnInit() {
    this.authService.checkLoginStatus()
    this.authService.isLoggedIn().subscribe((val:boolean)=>{
      if(val){
        this.isloggedout = val;
      }
      this.isloggedout = val;
      this.isloggedin = !val;
    })
  }

  logout(){
    this.authService.logout();
  }
}
