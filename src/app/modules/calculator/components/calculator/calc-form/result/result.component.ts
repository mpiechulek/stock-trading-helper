import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AdvanceCalculatorResultDataModel } from 'src/app/data/models/form.model';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html'
})
export class ResultComponent implements OnInit {

  // When 0 the expansion panel is default opened, 1 closed
  @Input()
  readonly formExpand: number

  @Input()
  readonly calculationResults: AdvanceCalculatorResultDataModel;

  @Output()
  public toggleExpandForm: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  // Toggle expansion pane 
  onToggleExpandForm(): void {

    this.toggleExpandForm.emit();

  }

}
