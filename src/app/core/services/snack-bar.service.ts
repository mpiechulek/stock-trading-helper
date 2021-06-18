import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  //  //snackbar
  //  this.snackBar.open('Message archived', 'Undo', {
  //   duration: 2000
  // });
}
