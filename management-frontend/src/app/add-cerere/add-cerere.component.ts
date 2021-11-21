import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CereriService } from '../cereri.service';


export interface DialogData {
  message: string;
  rezultat: any;
}


@Component({
  selector: 'app-add-cerere',
  templateUrl: './add-cerere.component.html',
  styleUrls: ['./add-cerere.component.css']
})
export class AddCerereComponent implements OnInit {

  tipuri : string[] = ['permisie', 'invoire', 'restanta'];
  cerereNoua : any = {
    typeCerere : ''
  };
  hasCerereBeenSaved: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddCerereComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private serviciuCereri: CereriService) { }



  ngOnInit(): void {
    console.log('Cerere component');
  }

  onNoClick(): void {
    console.log('NO CLICK HAS BEEN CLICKED');
    this.data.rezultat = false;
    this.dialogRef.close();
  }

  

  saveCerere() {
    console.log('salvam o cerere')

    this.serviciuCereri.saveCerere(this.cerereNoua)
      .subscribe(cerereSalvata => {
        console.log('Cerere salvata pe server: ', cerereSalvata);

        console.log('CERERE SAVED: ', cerereSalvata)
        this.hasCerereBeenSaved = true;
        this.data.rezultat = cerereSalvata;
      })
  }

}
