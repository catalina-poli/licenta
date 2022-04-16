import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnunturiService } from '../anunturi.service';
import { Anunt } from '../model/anunt';
import { FileService } from '../services/file.service';

export interface DialogData {
  message: string;
  rezultat: any;
}


@Component({
  selector: 'app-add-anunt-document',
  templateUrl: './add-anunt-document.component.html',
  styleUrls: ['./add-anunt-document.component.css']
})
export class AddAnuntDocumentComponent implements OnInit {

  
  hasAnuntBeenSaved: boolean = false;
  errors_titlu_required : boolean = false;
  titluAnuntNou: string = '';

  fileToUpload: File | null = null;

  onFileSelected(event: any) {
    this.fileToUpload = event.target.files[0];
  }
  
  constructor(
    public dialogRef: MatDialogRef<AddAnuntDocumentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private serviciuAnunturi: AnunturiService,
    private fileService: FileService) { }



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

    if(!this.titluAnuntNou){
      this.errors_titlu_required = true;
    }else{
      this.errors_titlu_required = false;
    }
    let errors = this.errors_titlu_required;
    if(errors){
      return;
    }
    console.log('saving request: ', this.fileToUpload)
    this.fileService.uploadFileWithoutSubscribe(this.fileToUpload, `http://localhost:8080/uploadFile-anunt/${this.titluAnuntNou}`)
      .subscribe(
        rez => {
          this.hasAnuntBeenSaved = true;
          this.data.rezultat = rez;
          console.log('saving result: ', rez);
        },
        err => {
          console.log('err: ', err);
        }
      );
    // this.serviciuAnunturi.saveAnunt(this.anuntNou)
    //   .subscribe(anuntulSalvat => {
    //     console.log('Anuntul salvat pe server: ', anuntulSalvat);
    //     // this.anunturile.push(anuntulSalvat);
    //     // this.loadInitial();
    //     console.log('ANUNT SAVED: ', anuntulSalvat)
    //     this.hasAnuntBeenSaved = true;
    //     this.data.rezultat = anuntulSalvat;
    //   })
  }

}
