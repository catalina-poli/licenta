import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CereriService } from '../cereri.service';
import { Cerere } from '../model/cerere';
import { CerereDetailed } from '../model/cerere-detailed';
import { FileService } from '../services/file.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-cerere-forms',
  templateUrl: './add-cerere-forms.component.html',
  styleUrls: ['./add-cerere-forms.component.css']
})
export class AddCerereFormsComponent implements OnInit {

  filtruTipCerere: string = '';

  cererileAfisate: Cerere[] = [];
  cererile: Cerere[] = [];
  cerereNoua: any = {
    typeCerere: ''
  };
  cerereNouaDetailed: CerereDetailed = new CerereDetailed();

  displayedColumns: string[] = ['id', 'datePosted', 'type', 'userAssociated', 'actions'];
  // <th>Id</th>
  // <th>Date posted</th>
  // <th>Type</th>
  // <th>User associated</th>
  // <th>Actions</th>

  tipuri: string[] = ['permisie', 'invoire', 'restanta'];

  // add cerere document
  usersList: any[] = [];
  usersSelected: any[] = [];
  usersSelectedCerereDetailed: any[] = [];
  fileName = '';
  fileToUpload: File | null = null;
  hasCerereBeenSaved: boolean = false;


  constructor(private cereriService: CereriService,
    private usersService: UserService,
    
    private fileService: FileService) { }

  selectOptiuneFiltru() {
    console.log('optiune curenta: ', this.filtruTipCerere);
    if (this.filtruTipCerere == 'all') {
      this.cererileAfisate = [...this.cererile];
    } else {
      this.cererileAfisate = this.cererile.filter(x => x.typeCerere == this.filtruTipCerere);
    }
  }

  ngOnInit(): void {

    this.cereriService.findAllCereri().subscribe(rez => {
      this.cererile = rez;
      this.cererileAfisate = [...this.cererile];//copie
    });

    console.log('Cerere component');
    this.usersService.findAllUsersForCerere()
      .subscribe(
        users => {
          this.usersList = users;
          for (let user of this.usersList) {
            user.canInterrupt = false;
          }
        },
        err => {
          console.log('could not load users: ', err);
        }

      );
  }

  addCerere() {
    this.cereriService.openDialog('Adauga Cerere').subscribe(result => {
      console.log('The dialog was closed: ', result);
      if (result) {
        this.cererile.push(result);
      }
    });
  }

  removeFromCerere(user: any) {
    this.usersSelected.splice(this.usersSelected.indexOf(user), 1);
  }


  removeFromCerereDetailed(user: any) {
    this.usersSelectedCerereDetailed.splice(this.usersSelectedCerereDetailed.indexOf(user), 1);
  }

  saveCerere() {
    console.log('salvam o cerere')

    console.log('cerere noua: ', this.cerereNoua);
    console.log('users selected: ', this.usersSelected);
    this.cereriService.saveCerereWithUsersAndPriority(this.cerereNoua, this.usersSelected, this.type)
      .subscribe(cerereSalvata => {
        console.log('Cerere salvata pe server: ', cerereSalvata);

        console.log('CERERE SAVED: ', cerereSalvata)
        this.hasCerereBeenSaved = true;
        // this.data.rezultat = cerereSalvata;
        // 
        this.fileService.uploadFile(this.fileToUpload, "http://localhost:8080/uploadFile/" + cerereSalvata.id);
      })
  }


  onFileSelected(event: any) {
    this.fileToUpload = event.target.files[0];

  }


  defaultFlow: boolean = true;
  type: string = 'DEFAULT_FLOW_USERS';

  userSwitchedOption(){
 
    this.type = this.defaultFlow ? 'DEFAULT_FLOW_USERS' : 'SPECIFIC_USERS';
    console.log('user wants to select specific: ', this.defaultFlow)
  }

  saveCerereDetailed() {
    console.log('saving cerere detailed: ', this.cerereNouaDetailed);
    // saveCerereDetailedWithUsersAndPriority

    console.log('users selected: ', this.usersSelectedCerereDetailed);
    this.type = this.defaultFlow ? 'DEFAULT_FLOW_USERS' : 'SPECIFIC_USERS';
    this.cereriService.saveCerereWithUsersAndPriority(this.cerereNouaDetailed, this.usersSelectedCerereDetailed, this.type)
      .subscribe(cerereSalvata => {
        console.log('Cerere salvata pe server: ', cerereSalvata);

        console.log('CERERE SAVED: ', cerereSalvata)
        // this.hasCerereBeenSaved = true;
        // this.data.rezultat = cerereSalvata;

      })
  }

}
