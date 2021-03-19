import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html'
})
export class ResultComponent implements OnInit {

  // When 0 the expansion panel is default opened, 1 closed
  @Input()
  formExpand: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  // Toggle expansion pane 
  setStep() {
 
  }



}
