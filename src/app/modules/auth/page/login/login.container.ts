import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { UserLoginData } from 'src/app/data/models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.container.html'
})
export class LoginContainerComponent implements OnInit {

  private _loginFormDisabled: boolean = false;
  private returnUrl: string;

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router) {

    // redirect to home if already logged in
    if (this.authenticationService.userValue) {

      this.router.navigate(['/']);

    }
  }

  ngOnInit(): void {

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/main/home';

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

    this.authenticationService.login(loginData.userName, loginData.password)

    .pipe(first())

    .subscribe({

        next: () => {

            this.router.navigate([this.returnUrl]);

        },
        error: error => {            

          this._loginFormDisabled = false;

        }

    });

  }

}
