import { Component, OnInit } from '@angular/core';
import { UserLoginData } from 'src/app/data/models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.container.html'
})
export class LoginContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * 
   */
  submitLogin(loginData: UserLoginData): void {

    console.log(loginData);
    

  }

}
