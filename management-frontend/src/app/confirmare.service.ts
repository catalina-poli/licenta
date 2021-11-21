import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmareComponent } from './confirmare/confirmare.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmareService {

  constructor(public dialog: MatDialog) {}

  openDialog(message : string): void {
    const dialogRef = this.dialog.open(ConfirmareComponent, {
      width: '250px',
      data: {message : message, rezultat : false} 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: ', result);
      // this.message = result;
    });
  }
}
