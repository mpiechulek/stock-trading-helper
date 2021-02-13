import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/core/services/form.service';
import { TradeFormData } from 'src/app/data/models/form.model';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.container.html',

})
export class TradeContainerComponent implements OnInit {

  private dataToEdit: TradeFormData;

  constructor(private formService: FormService) { }

  ngOnInit(): void {
  }

  get getDataToEdit():TradeFormData  {
    return this.dataToEdit;

  }

  saveEntreFormDataToLocalStorage(formData: TradeFormData): void {
    console.log('data in container');
    this.formService.saveEntreFormDataToLocalStorage(formData);
  }

  editStockTileData() {

  }

}
