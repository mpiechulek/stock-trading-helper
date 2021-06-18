import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {

    private durationTimeMilliseconds: number = 3000;
    private horizontalPosition: MatSnackBarHorizontalPosition = 'start';
    private verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    constructor(private snackBar: MatSnackBar) { }

    /**
     * 
     */
    onDisplaySuccess(message: string): void {

        this.snackBar.open(
            message,
            'X',
            {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: this.durationTimeMilliseconds,
                panelClass: 'snack-bar-success'
            }
        );

    }


    /**
     * 
     */
    onDisplayWarning(message: string): void {

        this.snackBar.open(
            message,
            'X',
            {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: this.durationTimeMilliseconds,
                panelClass: 'snack-bar-warning'
            }
        );
    }

    /**
     * 
     */
    onDisplayError(message: string): void {
        this.snackBar.open(
            message,
            'X',
            {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: this.durationTimeMilliseconds,
                panelClass: 'snack-bar-error'
            }
        );

    }

}
