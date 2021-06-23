import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html' 
})
export class LoginFormComponent implements OnInit {

  public hide: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }




//   <mat-form-field [formGroup]="form">
//     <input matInput placeholder='Name' [formControlName]="formControlName">
//   </mat-form-field>

// ngOnInit() {
//   this.form = this.fb.group({
//       name: new FormControl({ value: '', disabled: this.disabled })
//   });
// }

// public form: FormGroup;
// public form: any;

// import { FormGroup, FormControl } from '@angular/forms';


  

}
