import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CereriService } from '../cereri.service';
import { UserService } from '../user.service';


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



  usersList: any[] = [];
  usersSelected: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddCerereComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private serviciuCereri: CereriService,
    private usersService: UserService) { }



  ngOnInit(): void {
    console.log('Cerere component');
    this.usersService.findAllUsersForCerere()
      .subscribe(
        users=>{
          this.usersList = users;
          for(let user of this.usersList){
            user.canInterrupt = false;
          }
        },
        err =>{
          console.log('could not load users: ', err);
        }

      );
  }

  onNoClick(): void {
    console.log('NO CLICK HAS BEEN CLICKED');
    this.data.rezultat = false;
    this.dialogRef.close();
  }

  removeFromCerere(user: any){
    this.usersSelected.splice(this.usersSelected.indexOf(user), 1);
  }

  saveCerere() {
    console.log('salvam o cerere')

    console.log('cerere noua: ', this.cerereNoua);
    console.log('users selected: ', this.usersSelected);
    this.serviciuCereri.saveCerereWithUsersAndPriority(this.cerereNoua, this.usersSelected)
      .subscribe(cerereSalvata => {
        console.log('Cerere salvata pe server: ', cerereSalvata);

        console.log('CERERE SAVED: ', cerereSalvata)
        this.hasCerereBeenSaved = true;
        this.data.rezultat = cerereSalvata;
      })
  }

  saveCerereOld() {
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
