import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
// import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { TradeTableDataModel } from 'src/app/data/models/statistics-section.model';

const ELEMENT_DATA: TradeTableDataModel[] = [
  {
    position: 1,
    stockName: 'JSW',
    quantity: '120',
    buyPrice: '15.56',
    sellPrice: '18.34',
    profitBeforeTax: '134.45',
    profitAfterTax: '1325',
    date: '2021-03-19'
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
    setTimeout(() => this.dataSource.sort = this.sort);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDeletePosition(): void {

  }

  onEditPosition(): void {

  }

}



