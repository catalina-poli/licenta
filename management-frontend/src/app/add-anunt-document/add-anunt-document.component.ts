import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnunturiService } from '../anunturi.service';
import { GroupService } from '../group.service';
import { Anunt } from '../model/anunt';
import { FileService } from '../services/file.service';
import { UserService } from '../user.service';

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
  errors_titlu_required: boolean = false;
  titluAnuntNou: string = '';

  grupuriSelected: any[] = [];
  grupuri: any[] = [];


  users: any[] = [];
  usersSelected: any[] = [];

  fileToUpload: File | null = null;

  onFileSelected(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  constructor(
    public dialogRef: MatDialogRef<AddAnuntDocumentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private serviciuAnunturi: AnunturiService,
    private fileService: FileService,
    private serviceUser: UserService,
    private groupService: GroupService) { }



  ngOnInit(): void {
    console.log('Anunt  component');
    this.serviceUser.findAllUsers()
      .subscribe(
        rez => {
          this.users = rez;
        },
        err => {
          console.log('error: ', err);
        }
      );

    this.groupService.findAllGroups()
      .subscribe(
        rez => {
          this.grupuri = rez;
          console.log('grupuri: ', this.grupuri);
        },
        err => {
          console.log('error loading groups: ', err);
        }
      );
  }

  onNoClick(): void {
    console.log('NO CLICK HAS BEEN CLICKED');
    this.data.rezultat = false;
    this.dialogRef.close();
  }




  saveAnunt() {
    let associatedWithUsers = false;
    console.log('salvam un anunt')

    if (!this.titluAnuntNou) {
      this.errors_titlu_required = true;
    } else {
      this.errors_titlu_required = false;
    }
    let errors = this.errors_titlu_required;
    if (errors) {
      return;
    }
    console.log('saving request: ', this.fileToUpload)
    console.log('users selected: ', this.usersSelected);
    let debug = false;
    if (debug) {
      return;
    }

    if (this.usersSelected.length > 0) {
      associatedWithUsers = true;
    } else if (this.grupuriSelected.length > 0) {
      associatedWithUsers = false;
    }

    this.fileService.uploadFileWithoutSubscribe(this.fileToUpload, `http://localhost:8080/uploadFile-anunt/${this.titluAnuntNou}`)
      .subscribe(
        rez => {
          this.hasAnuntBeenSaved = true;
          this.data.rezultat = rez;
          console.log('saving result: ', rez);

          if (associatedWithUsers) {


            this.serviciuAnunturi.associateWithUsers(rez.id, this.usersSelected)
              .subscribe(rez => {
                console.log('saved anunt: ', rez);
              },
                err => {
                  console.log('error: ', err);
                });

          } else {
            // TODO: associate with groups
            
            this.serviciuAnunturi.associateWithGroups(rez.id, this.grupuriSelected)
            .subscribe(rez => {
              console.log('saved anunt: ', rez);
            },
              err => {
                console.log('error: ', err);
              });
          }
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
