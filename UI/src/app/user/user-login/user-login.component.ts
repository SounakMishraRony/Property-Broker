import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/model/user';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit() {
  }

  onLogin(loginForm: NgForm) {
    // this.authService.authUser(loginForm.value).subscribe(
    //   (response: UserLogin)=>{
    //     const user=response;
    //     localStorage.setItem('token', user.token);
    //     localStorage.setItem('userName', user.userName);
    //     this.alertify.success('Login Successful');
    //     this.router.navigate(['/']);
    //   }
    // );
    const user= this.authService.authUser(loginForm.value);
    if(user){
      localStorage.setItem('token', user.token);
           localStorage.setItem('userName', user.userName);
           this.alertify.success('Login Successful');
           this.router.navigate(['/']);
    }
    else{
      this.alertify.error('Login unsuccessfull.please valid credentials.');
    }
    }

}
