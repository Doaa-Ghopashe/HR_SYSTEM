import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password!: string;

  // constructor(private authService: AuthService) {}
  loginform:FormGroup;
  constructor(){
    this.loginform = new FormGroup({
      email:new FormControl(null,[Validators.required , Validators.email]),
      password: new FormControl(null,[Validators.required ])
    });
  }
  login(): void {
    console.log(this.loginform);
  }
}
