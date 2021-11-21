import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  message: string;
  rezultat : boolean;
}

@Component({
  selector: 'app-confirmare',
  templateUrl: './confirmare.component.html',
  styleUrls: ['./confirmare.component.css']
})
export class ConfirmareComponent  {
  constructor(
    public dialogRef: MatDialogRef<ConfirmareComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    console.log('NO CLICK HAS BEEN CLICKED');
    this.data.rezultat = false;
    
  }

  // confirm(){
    // this.dialogRef.close();
  // }

  onYesClick() : void{
    console.log('YES HAS BEEN CLICKED');
    this.data.rezultat = true;
    // this.dialogRef.close();
    // return this.data.rezultat;
  }


}
