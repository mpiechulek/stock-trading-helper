import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-trade-dialog',
  templateUrl: './trade-dialog.component.html' 
})

export class TradeDialogComponent implements OnInit {

  myForm:  FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
