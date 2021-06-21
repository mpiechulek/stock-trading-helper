import { Component, Input, OnChanges, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { StockSellModel } from 'src/app/data/models/statistics-section.model';
@Component({
    selector: 'app-table',
    templateUrl: './table.component.html'
})

export class TableComponent implements OnInit, OnChanges {

    public dataSource: any;

    public displayedColumns: string[] =
        [
            'stockName',
            'quantity',
            'buyPrice',
            'sellPrice',
            'profitBeforeTax',
            'profitAfterTax',
            'sellDate',
            'deleteBtn'
        ];

    @Input() transactionsData: StockSellModel[] = [];

    @Output()
    deleteTradePositionFromTable: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    constructor() {

    }

    ngOnInit(): void {

        this.dataSource = new MatTableDataSource<StockSellModel>(this.transactionsData);

        // the time out is used because normally it didn't work
        setTimeout(() => this.dataSource.paginator = this.paginator);
        setTimeout(() => this.dataSource.sort = this.sort);

    }

    ngOnChanges(): void {

        this.dataSource = new MatTableDataSource<StockSellModel>(this.transactionsData);
        
    }

    /**
     * 
     * @param filterValue 
     */
    applyFilter(filterValue: string) {

        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {

            this.dataSource.paginator.firstPage();

        }
    }

    /**
     * 
     * @param id 
     */
    onDeletePosition(id: string): void {

        this.deleteTradePositionFromTable.emit(id);

    }

    /**
     * 
     */
    onEditPosition(): void {

    }

}



