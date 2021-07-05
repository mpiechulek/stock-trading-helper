import { Component, Input, OnChanges, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { StockSellModel } from 'src/app/data/models/statistics-section.model';
@Component({
    selector: 'app-table',
    templateUrl: './table.component.html'
})

export class TableComponent implements OnInit, OnChanges {

    public dataSource: any;

    public displayedColumns: string[] =
    
        [
            'companyName',
            'amountOfShares',
            'buyPrice',
            'currentPrice',
            'profitBeforeTax',
            'profitAfterTax',
            'sellDate',
            'deleteBtn'
        ];

    @Input() transactionsData: StockSellModel[] = [];

    @Output()
    deleteTradePositionFromTable: EventEmitter<string> =
        new EventEmitter<string>();

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    sortedData: any[];

    constructor() {

    }

    ngOnInit(): void {

        this.dataSource = new MatTableDataSource<StockSellModel>(this.transactionsData);    

    }

    ngOnChanges(): void {

        // After deleting the data is loaded again
        this.dataSource = new MatTableDataSource<StockSellModel>(this.transactionsData);

    }

    ngAfterViewInit() {

        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort;

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

    // sortData(sort: Sort) {

    //     console.log(this.transactionsData);        

    //     const data =  this.dataSource.slice();

    //     if (!sort.active || sort.direction === '') {

    //       this.sortedData = data;

    //       return;

    //     }
    
    //     this.sortedData = data.sort((a, b) => {

    //       const isAsc = sort.direction === 'asc';

    //       switch (sort.active) {

    //         case 'name': return this.compare(a.name, b.name, isAsc);

    //         case 'calories': return this.compare(a.calories, b.calories, isAsc);

    //         case 'fat': return this.compare(a.fat, b.fat, isAsc);

    //         case 'carbs': return this.compare(a.carbs, b.carbs, isAsc);

    //         case 'protein': return this.compare(a.protein, b.protein, isAsc);

    //         default: return 0;
    //       }

    //     });
    //   }

    //   compare(a: number | string, b: number | string, isAsc: boolean) {
    //     return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    //   }

}



