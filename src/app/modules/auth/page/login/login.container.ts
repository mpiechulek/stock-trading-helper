import { Component, OnInit } from '@angular/core';
import { UserLoginData } from 'src/app/data/models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.container.html'
})
export class LoginContainerComponent implements OnInit {

  private _loginFormDisabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  get loginFormDisabled(): boolean {

    return this._loginFormDisabled;

  }
  /**
   * 
   */
  submitLogin(loginData: UserLoginData): void {

    this._loginFormDisabled = true;

    console.log(loginData);


  }

}
