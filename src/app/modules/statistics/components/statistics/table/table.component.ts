import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { StockSellModel } from 'src/app/data/models/statistics-section.model';
import { Observable, Subscriber, Subscription } from 'rxjs';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html'
})

export class TableComponent implements OnInit {

    public dataSource;

    data: StockSellModel[] = [
        {
            id: '23131312321',
            companyName: 'AAAAAAa',
            sellDate: new Date(),
            amountOfShares: 455,
            buyPrice: 5453,
            buyValue: 54353,
            currentPrice: 534,
            currentValue: 5,
            profitBeforeTax: 53453,
            profitAfterTax: 3453,
            percentageChange: 534
        }
    ]

    public displayedColumns: string[] =
        [
            'stockName',
            'quantity',
            'buyPrice',
            'sellPrice',
            'profitBeforeTax',
            'profitAfterTax',
            'sellDate'
        ];

    @Input() transactions: StockSellModel[];  

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor() {

    }

    ngOnInit() {     

        this.dataSource = new MatTableDataSource<StockSellModel>(this.transactions);

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



