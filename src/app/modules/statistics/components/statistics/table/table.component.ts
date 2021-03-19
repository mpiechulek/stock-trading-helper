import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
// import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

export interface TradeTableDataModel {
  position: number;
  stockName: string;
  quantity: string;
  buyPrice: string;
  sellPrice: string;
  profitBeforeTax: string;
  lose: string;
  total: string;
  date: string;
}

const ELEMENT_DATA: TradeTableDataModel[] = [
  {
    position: 1,
    stockName: 'JSW',
    quantity: '120',
    buyPrice: '15.56',
    sellPrice: '18.34',
    profitBeforeTax: '134.45',   
    lose: '',
    total: '1234',
    date: '2021-03-19'
  },
  {
    position: 2,
    stockName: 'CDProject',
    quantity: '100',
    buyPrice: '460',
    sellPrice: '306',
    profitBeforeTax: '',   
    lose: '600',
    total: '861',
    date: '2021-03-28'
  }

];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {

  displayedColumns: string[] =
    [
      'position',
      'stockName',
      'quantity',
      'buyPrice',
      'sellPrice',
      'profitBeforeTax',   
      'lose',
      'total',
      'date'
    ];

  // For sorting the data source
  dataSource = new MatTableDataSource<TradeTableDataModel>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {

  }

  ngOnInit() {
    // the time out is used because normally it didn't work
    setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(() =>  this.dataSource.sort = this.sort);  
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDeletePosition() : void{

  }

  onEditPosition() : void{

  }

}



