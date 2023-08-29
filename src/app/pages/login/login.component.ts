import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginform: FormGroup;

  constructor(private _router: Router, private auth: AuthService) {
    this.loginform = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }
  
  login(): void {

    if (this.loginform.status == 'INVALID') {
      return;
    }
    this.auth.login(this.loginform.value).subscribe(
      {
        
        next: res => {
          localStorage.setItem("token", res.token);
          localStorage.setItem("username", res.username);
          this.auth.setLoggedIn(true)
          this._router.navigateByUrl('/dashboard');
        },
        error: err => alert(err.error.message),
        complete: () => {
        }
      })
  }
}
