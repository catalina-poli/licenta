import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AnunturiService } from 'src/app/anunturi.service';
import { ConfirmareService } from 'src/app/confirmare.service';
import { ConfirmareComponent } from 'src/app/confirmare/confirmare.component';
import { Anunt } from 'src/app/model/anunt';

export interface DialogData {
  anunt: Anunt;
}

@Component({
  selector: 'app-edit-anunt-dialog',
  templateUrl: './edit-anunt-dialog.component.html',
  styleUrls: ['./edit-anunt-dialog.component.css']
})
export class EditAnuntDialogComponent implements OnInit {

  anunt: Anunt = new Anunt();
  constructor(
    public dialogRef: MatDialogRef<EditAnuntDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private anuntService: AnunturiService,
    private httpClient: HttpClient,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.anunt = this.data.anunt;
  }

  updateAnuntCancel() {
  }

  updateAnunt() {
    console.log('trimitem pe server: ', this.anunt);
    // this.confirmareService.openDialog('hello');
    if (this.anunt) {
      this.anuntService.updateAnunt(this.anunt)
        .subscribe(anuntulSalvat => {
          console.log('Anuntul modificat pe server: ', anuntulSalvat);
          this.anunt = anuntulSalvat;
          
          this.dialogRef.close();
          // this.loadInitial();
          // this.sendPdfRequestServer(this.anunt);
        })
    }


  }

}
