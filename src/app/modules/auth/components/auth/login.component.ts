import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserLoginData } from 'src/app/data/models/auth.model';

@Component({
  selector: 'app-login-ui',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  @Output()
  userLoginData: EventEmitter<UserLoginData> = new EventEmitter<UserLoginData>();

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
