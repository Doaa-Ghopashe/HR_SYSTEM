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
  isLoggedIn!:boolean;
  isLoggedOut!:boolean;
  nameFirstChar!:string|undefined;
  nameSecondChar!:string|undefined;
  constructor(private authService:AuthService){
    if(localStorage.getItem('username')){
      this.nameFirstChar= localStorage.getItem('username')?.split(" ")[0]?.charAt(0).toUpperCase()
      this.nameSecondChar= localStorage.getItem('username')?.split(" ")[1]?.charAt(0).toUpperCase()
    }
  }
  
  ngOnInit() {

    this.authService.checkLoginStatus()
    this.authService.isLoggedIn().subscribe((val:boolean)=>{
      this.isLoggedOut = val;
      this.isLoggedIn = !val;
    })
  }

  logout(){
    this.authService.logout();
  }
}
