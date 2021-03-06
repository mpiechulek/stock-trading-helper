import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserLoginData } from 'src/app/data/models/auth.model';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})

export class LoginFormComponent implements OnInit {

  public hide: boolean = true;
  public loginForm: FormGroup;

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

  constructor(private FormBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.loginForm = this.FormBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  /**
   * 
   */
  get userName(): AbstractControl {

    return this.loginForm.get('userName');

  }

  /**
   * 
   */
  get password(): AbstractControl {

    return this.loginForm.get('password');

  }

  /**
   * 
   */
  onSubmitLogin(): void {

    if(!this.loginForm.valid) return;

    // sending the form data
    this.userLoginData.emit(this.loginForm.value);

    // Disabling the form submit button, and the form inputs
    this.loginFormDisabled = true;

    this.loginForm.reset();
    this.loginForm.disable();

  }

}
