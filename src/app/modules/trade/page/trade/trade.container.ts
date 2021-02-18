import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/core/services/form.service';
import { TradeFormData } from 'src/app/data/models/form.model';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.container.html',

})
export class TradeContainerComponent implements OnInit {

  private formDataToEdit: TradeFormData;

  constructor(private formService: FormService) { }

  ngOnInit(): void {
  }

  get getDataToEdit():TradeFormData  {
    return this.formDataToEdit;
  }

  saveEntreFormDataToLocalStorage(formData: TradeFormData): void {   
    this.formService.saveEntreFormDataToLocalStorage(formData);
  }

  editStockTileData() {

  }

}
