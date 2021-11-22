import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnunturiService } from '../anunturi.service';
import { Anunt } from '../model/anunt';

export interface DialogData {
  message: string;
  rezultat: any;
}

@Component({
  selector: 'app-add-anunt',
  templateUrl: './add-anunt.component.html',
  styleUrls: ['./add-anunt.component.css']
})
export class AddAnuntComponent implements OnInit {

  anuntNou: Anunt = new Anunt();
  hasAnuntBeenSaved: boolean = false;
  errors_titlu_required : boolean = false;
  
  constructor(
    public dialogRef: MatDialogRef<AddAnuntComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private serviciuAnunturi: AnunturiService) { }



  ngOnInit(): void {
    console.log('Anunt  component');
  }

  onNoClick(): void {
    console.log('NO CLICK HAS BEEN CLICKED');
    this.data.rezultat = false;
    this.dialogRef.close();
  }

  
  

  saveAnunt() {
    console.log('salvam un anunt')

    if(!this.anuntNou.titlu){
      this.errors_titlu_required = true;
    }else{
      this.errors_titlu_required = false;
    }
    let errors = this.errors_titlu_required;
    if(errors){
      return;
    }
    this.serviciuAnunturi.saveAnunt(this.anuntNou)
      .subscribe(anuntulSalvat => {
        console.log('Anuntul salvat pe server: ', anuntulSalvat);
        // this.anunturile.push(anuntulSalvat);
        // this.loadInitial();
        console.log('ANUNT SAVED: ', anuntulSalvat)
        this.hasAnuntBeenSaved = true;
        this.data.rezultat = anuntulSalvat;
      })
  }

}
