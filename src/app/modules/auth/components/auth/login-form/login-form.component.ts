import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {

  public hide: boolean = true;
  public loginForm: FormGroup;
  public disabledFormField: boolean = false;

  @Output() userLoginData =  new EventEmitter<FormGroup>();

  constructor(private FormBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.loginForm = this.FormBuilder.group({    
      userName: [{value:'', disabled: this.disabledFormField}, Validators.required] ,
      password: [{value:'', disabled: this.disabledFormField}, Validators.required]
    });

  }

  /**
   * 
   */
  get userName(): AbstractControl  {

    return this.loginForm.get('userName');

  }

  
  /**
   * 
   */
   get password(): AbstractControl  {

    return this.loginForm.get('password');

  }

  onSubmit(): void { 

    // sending the form data
    this.userLoginData.emit(this.loginForm.value);

    // Disabling the form submit button, and the form inputs
    this.disabledFormField = true;
 
    // resting the form
    this.loginForm.reset();

  }

}
