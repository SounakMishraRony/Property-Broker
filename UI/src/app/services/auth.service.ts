import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserLogin,UserForRegister } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl= environment.baseUrl;

  constructor(private http:HttpClient) { }
  authUser(user:UserLogin){
  //   return this.http.post(this.baseUrl+ 'account/login',user);
  // }
    let UserArray= [];
    if(localStorage.getItem('Users')){
      UserArray=JSON.parse(localStorage.getItem('Users'));
    }
    return UserArray.find(p => p.userName === user.userName && p.password === user.password);
  }
  addUser(user:UserForRegister){
    return this.http.post(this.baseUrl +'account/register',user);
  }
}
