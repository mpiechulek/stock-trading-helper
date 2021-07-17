import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserLoginData } from 'src/app/data/models/auth.model';
@Component({
  selector: 'app-login-ui',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  @Output()
  userLoginData: EventEmitter<UserLoginData> = new EventEmitter<UserLoginData>();

  private _loginFormDisabled: boolean;

  @Input('loginFormDisabled')
  set loginFormDisabled(value: boolean) {

    this._loginFormDisabled = value;

  }

  get loginFormDisabled(): boolean {

    return this._loginFormDisabled;
    
  }

  constructor() { }

  ngOnInit(): void {

  }

  /**
   * 
   * @param loginData 
   */
  submitLogin(loginData: UserLoginData): void {

    this.userLoginData.emit(loginData);

  }

}
