import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-result-board',
  templateUrl: './result-board.component.html'

})
export class ResultBoardComponent implements OnInit {

  @Input() readonly arrayOfResults: Object[];

  @Output() resetResultArray: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * 
   */
  onResetBoardOfResults(): void {

    this.resetResultArray.emit();

  }

}
