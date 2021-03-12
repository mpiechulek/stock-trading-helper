import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
// import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

export interface PeriodicElement {
  position: number;
  stockName: string;
  quantity: string;
  buyPrice: string;
  sellPrice: string;
  profitBeforeTax: string;
  profitAfterTax: string;
  lose: string;
  total: string;
  date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    stockName: 'JSW',
    quantity: '120',
    buyPrice: '15.56',
    sellPrice: '18.34',
    profitBeforeTax: '134.45',
    profitAfterTax: '123.34',
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
    profitAfterTax: '',
    lose: '600',
    total: '861',
    date: '2021-03-28'
  },
  {
    position: 3,
    stockName: 'CDProject',
    quantity: '100',
    buyPrice: '460',
    sellPrice: '306',
    profitBeforeTax: '',
    profitAfterTax: '',
    lose: '600',
    total: '861',
    date: '2021-03-28'
  },
  {
    position: 4,
    stockName: 'CDProject',
    quantity: '100',
    buyPrice: '460',
    sellPrice: '306',
    profitBeforeTax: '',
    profitAfterTax: '',
    lose: '600',
    total: '861',
    date: '2021-03-28'
  },
  {
    position: 5,
    stockName: 'CDProject',
    quantity: '100',
    buyPrice: '460',
    sellPrice: '306',
    profitBeforeTax: '',
    profitAfterTax: '',
    lose: '600',
    total: '861',
    date: '2021-03-28'
  },
  {
    position: 6,
    stockName: 'CDProject',
    quantity: '100',
    buyPrice: '460',
    sellPrice: '306',
    profitBeforeTax: '',
    profitAfterTax: '',
    lose: '600',
    total: '861',
    date: '2021-03-28'
  },
  {
    position: 7,
    stockName: 'CDProject',
    quantity: '100',
    buyPrice: '460',
    sellPrice: '306',
    profitBeforeTax: '',
    profitAfterTax: '',
    lose: '600',
    total: '861',
    date: '2021-03-28'
  },
  {
    position: 8,
    stockName: 'CDProject',
    quantity: '100',
    buyPrice: '460',
    sellPrice: '306',
    profitBeforeTax: '',
    profitAfterTax: '',
    lose: '600',
    total: '861',
    date: '2021-03-28'
  },
  {
    position: 9,
    stockName: 'CDProject',
    quantity: '100',
    buyPrice: '460',
    sellPrice: '306',
    profitBeforeTax: '',
    profitAfterTax: '',
    lose: '600',
    total: '861',
    date: '2021-03-28'
  },
  {
    position: 10,
    stockName: 'CDProject',
    quantity: '100',
    buyPrice: '460',
    sellPrice: '306',
    profitBeforeTax: '',
    profitAfterTax: '',
    lose: '600',
    total: '861',
    date: '2021-03-28'
  },
  {
    position: 11,
    stockName: 'CDProject',
    quantity: '100',
    buyPrice: '460',
    sellPrice: '306',
    profitBeforeTax: '',
    profitAfterTax: '',
    lose: '600',
    total: '861',
    date: '2021-03-28'
  },
  {
    position: 12,
    stockName: 'CDProject',
    quantity: '100',
    buyPrice: '460',
    sellPrice: '306',
    profitBeforeTax: '',
    profitAfterTax: '',
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
      'profitAfterTax',
      'lose',
      'total',
      'date'
    ];

  // For sorting the data source
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {
   
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;   
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}



