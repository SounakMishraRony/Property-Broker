import { Injectable } from '@angular/core';
import { UserForRegister } from '../model/user';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private alertify:AlertifyService) { }

  addUser(user:UserForRegister){
    let users=[];
    if(localStorage.getItem('Users')){
      users=JSON.parse(localStorage.getItem('Users'));
      users=[user,...users];
      this.alertify.success('Congrats, you are successfully registered');
    } else{
        users=[user];
        this.alertify.success('Congrats, you are successfully registered');
      }
      localStorage.setItem('Users',JSON.stringify(users));
    }
}
