import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-result-board',
  templateUrl: './result-board.component.html'

})
export class ResultBoardComponent implements OnInit {

  @Input() readonly arrayOfResults: Object[];

  @Output()
  resetResultArray: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  chosenResult: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * 
   */
  onResetBoardOfResults(): void {

    this.resetResultArray.emit();

  }

  onClickResultList(event: any): void {     

    if (event.target.getAttribute('key') === 'result') {

      console.log('dsdasd');
      

      this.chosenResult.emit(event.target.innerText);

    }

    return;

  }

}
