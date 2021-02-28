import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html'
})
export class ResultComponent implements OnInit {

  // When 0 the expansion panel is default opened, 1 closed
  step = 0;

  constructor() { }

  ngOnInit(): void {
  }

  // Toggle expansion pane 
  setStep(index: number) {
    this.step = index;
  }

}
