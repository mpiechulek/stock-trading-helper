import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calc-form',
  templateUrl: './calc-form.component.html'

})
export class CalcFormComponent implements OnInit {

  private formExpand: number;

  constructor() { }

  ngOnInit(): void {
  }

  get getFormExpand(): number {
    return this.formExpand;
  }

  onCalculate() { 
    
  }

}
