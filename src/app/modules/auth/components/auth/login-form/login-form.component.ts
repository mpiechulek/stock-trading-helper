import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {

  public hide: boolean = true;
  public loginForm: FormGroup;
  private disabledFormField: boolean = false;

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
  get userName(): string {

    return this.loginForm.value.userName;

  }

  
  /**
   * 
   */
   get password(): string {

    return this.loginForm.value.password;

  }

  onSubmit(): void {

    console.log(this.loginForm.value);

  }

}
