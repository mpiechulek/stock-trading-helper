import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { UserLoginData } from 'src/app/data/models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.container.html'
})
export class LoginContainerComponent implements OnInit {

  private _loginFormDisabled: boolean = false;

  constructor(private authenticationService: AuthenticationService) { }

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

    this.loginUser(loginData);

  }

  /**
   * 
   * @param loginData 
   */
  loginUser(loginData: UserLoginData): void {

    this.authenticationService.login(loginData.userName, loginData.password);

  }

}
