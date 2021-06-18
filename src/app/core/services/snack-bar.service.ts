import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  

  constructor(private snackBar: MatSnackBar) { }



  /**
   * 
   */
  onDisplaySuccess(message: string): void {
    
    this.snackBar.open(message, 'Close', {
      duration: 2000
    });

  }


  /**
   * 
   */
  onDisplayWarning(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000
    });

  }

  /**
   * 
   */
  onDisplayError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000
    });

  }

}
