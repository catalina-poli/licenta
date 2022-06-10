import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CereriService } from '../cereri.service';
import { Cerere } from '../model/cerere';
import { CerereDetailed } from '../model/cerere-detailed';
import { FileService } from '../services/file.service';
import { UserService } from '../user.service';

import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { CustomFlowService } from '../custom-flow.service';
import { CustomFlowModel } from '../model/custom-flow';


@Component({
  selector: 'app-add-cerere-forms',
  templateUrl: './add-cerere-forms.component.html',
  styleUrls: ['./add-cerere-forms.component.css']
})
export class AddCerereFormsComponent implements OnInit, AfterViewInit {

  filtruTipCerere: string = 'all';

  archived: boolean = false;
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

  tipuri: string[] = ['PERMISIE', 'INVOIRE', 'RESTANTA'];

  // add cerere document
  usersList: any[] = [];
  usersSelected: any[] = [];
  usersSelectedCerereDetailed: any[] = [];
  fileName = '';
  fileToUpload: File | null = null;
  hasCerereBeenSaved: boolean = false;


  // pagination
  isLoadingResults = true;
  isRateLimitReached = false;
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;


  ngAfterViewInit(): void {
    console.log('after view init')
    this.loadInitial();
    // this.loadInitialDetailed();
  }

  // findAllMatTableDetailed


  loadInitial() {


    if (this.sort) {
      this.filtruTipCerere = this.filtruTipCerere.toLowerCase();
      this.sort.sortChange.subscribe(() => this.paginator ? this.paginator.pageIndex = 0 : 0);
      merge(this.sort.sortChange, this.paginator ? this.paginator.page : 0)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoadingResults = true;



            return this.cereriService.findAllMatTable(this.filtruTipCerere,
              this.sort ? this.sort.active : '', this.sort ? this.sort.direction : 'asc', this.paginator ? this.paginator.pageIndex : 0, this.archived)
              .pipe(catchError(() => observableOf(null)));


          }),
          map(data => {
            // Flip flag to show that loading has finished.
            this.isLoadingResults = false;
            this.isRateLimitReached = data === null;

            if (data === null) {
              return [];
            }

            // Only refresh the result length if there is new data. In case of rate
            // limit errors, we do not want to reset the paginator to zero, as that
            // would prevent users from re-triggering requests.
            this.resultsLength = data['totalElements'];
            return data['content'];
          })
        ).subscribe(data => {
          console.log('data: ', data);
          this.cererileAfisate = data;
          this.cererile = data;
        });
      this.changeDetectorRefs.detectChanges();

    }
  }
  // ./pagination

  constructor(private cereriService: CereriService,
    private usersService: UserService,
    private changeDetectorRefs: ChangeDetectorRef,
    private fileService: FileService,
    private customFlowService: CustomFlowService) { }

  myCustomFlows: CustomFlowModel[] = [];
  customFlowSelected: CustomFlowModel | null = null;

  selectOptiuneFiltru() {
    console.log('optiune curenta: ', this.filtruTipCerere);
    this.loadInitial();
  }

  ngOnInit(): void {


    this.customFlowService.findAllMyCustomFlow()
      .subscribe(
        rez => {
          this.myCustomFlows = rez;
          console.log('my custom flows: ', this.myCustomFlows)
        },
        err => {
          console.log('err: ', err);
        }
      );

    // this.cereriService.findAllCereri().subscribe(rez => {
    //   this.cererile = rez;
    //   this.cererileAfisate = [...this.cererile];//copie
    // });
    // this.loadInitial();

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


  customFlowSelect() {
    console.log('user has selected a custom flow: ', this.customFlowSelected);
    this.customFlowService.findCustomFlowMemberUsers(this.customFlowSelected ? this.customFlowSelected.id : -1)
      .subscribe(
        rezUsers => {
          this.type = 'SPECIFIC_USERS';// this.defaultFlow ? 'DEFAULT_FLOW_USERS' : 'SPECIFIC_USERS';
          this.usersSelected = rezUsers;
          this.defaultFlow = false;
          console.log('users selected: ', this.usersSelected);

        },
        err => {
          console.log('err: ', err);
        }
      );
  }

  addCerere() {
    this.cereriService.openDialog('Adauga Cerere').subscribe(result => {
      console.log('The dialog was closed: ', result);
      if (result) {
        this.cererile.push(result);
        this.loadInitial();

      }
    });
  }

  removeFromCerere(user: any) {
    this.usersSelected.splice(this.usersSelected.indexOf(user), 1);
    this.loadInitial();

  }


  removeFromCerereDetailed(user: any) {
    this.usersSelectedCerereDetailed.splice(this.usersSelectedCerereDetailed.indexOf(user), 1);
    this.loadInitial();

  }



  saveCerere() {
    console.log('salvam o cerere')

    console.log('cerere noua: ', this.cerereNoua);
    console.log('users selected: ', this.usersSelected);


    this.cereriService.saveCerereWithUsersAndPriority(this.cerereNoua, null, this.usersSelected, this.type)
      .subscribe(cerereSalvata => {
        console.log('Cerere salvata pe server: ', cerereSalvata);

        console.log('CERERE SAVED: ', cerereSalvata)
        this.hasCerereBeenSaved = true;
        // this.data.rezultat = cerereSalvata;
        // 
        this.fileService.uploadFile(this.fileToUpload, "http://localhost:8080/uploadFile/" + cerereSalvata.id);
        this.loadInitial();

      })
  }


  onFileSelected(event: any) {
    this.fileToUpload = event.target.files[0];

  }


  defaultFlow: boolean = true;
  type: string = 'DEFAULT_FLOW_USERS';

  userSwitchedOption() {

    this.type = this.defaultFlow ? 'DEFAULT_FLOW_USERS' : 'SPECIFIC_USERS';
    console.log('user wants to select specific: ', this.defaultFlow)
  }

  saveCerereDetailed() {
    console.log('saving cerere detailed: ', this.cerereNouaDetailed);
    // saveCerereDetailedWithUsersAndPriority

    console.log('users selected: ', this.usersSelectedCerereDetailed);
    this.type = this.defaultFlow ? 'DEFAULT_FLOW_USERS' : 'SPECIFIC_USERS';
    this.cereriService.saveCerereWithUsersAndPriority(null, this.cerereNouaDetailed, this.usersSelectedCerereDetailed, this.type)
      .subscribe(cerereSalvata => {
        console.log('Cerere salvata pe server: ', cerereSalvata);

        console.log('CERERE SAVED: ', cerereSalvata);
        // this.cerereNoua = null;
        this.cerereNouaDetailed = new CerereDetailed();;
        // this.hasCerereBeenSaved = true;
        // this.data.rezultat = cerereSalvata;
        this.loadInitial();


      })
  }

  viewArchiveDocument(statusArchived: boolean) {
    this.archived = statusArchived;
    this.loadInitial();
  }

}
