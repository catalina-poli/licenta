import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AnunturiService } from '../anunturi.service';
import { Anunt } from '../model/anunt';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { UserService } from '../user.service';
import { FileService } from '../services/file.service';


@Component({
  selector: 'app-anunturi',
  templateUrl: './anunturi.component.html',
  styleUrls: ['./anunturi.component.css']
})
export class AnunturiComponent implements OnInit, AfterViewInit {

  titluComponenta: string = 'Anunturi here';

  displayedColumns: string[] = ['id', 'titlu', 'continut', 'actionsCol'];


  // ---- ./paginare (tabel)


  // ---- paginare (datele)
  data: Anunt[] = [];

  isLoadingResults = true;
  isRateLimitReached = false;
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  loadInitial() {

    if (this.sort) {
      console.log('sort ok')

      this.sort.sortChange.subscribe(() => this.paginator ? this.paginator.pageIndex = 0 : 0);
      merge(this.sort.sortChange, this.paginator ? this.paginator.page : 0)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoadingResults = true;
            return this.serviciuAnunturi.findAllMatTable(
              this.sort ? this.sort.active : '', this.sort ? this.sort.direction : 'asc', this.paginator ? this.paginator.pageIndex : 0)
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
        ).subscribe(data => this.data = data);
      this.changeDetectorRefs.detectChanges();

    }else{
      console.log('anunturi no sort');
    }
  }
  // ---- ./paginare


  // serviciuHttpClient : HttpClient = new HttpClient();

  // @Autowired
  // private serviciuHttpClient  HttpClient;
  constructor(private serviciuHttpClient: HttpClient,
    private serviciuAnunturi: AnunturiService,
    private changeDetectorRefs: ChangeDetectorRef,
    private userService : UserService,
    private fileService: FileService) {
    console.log('AnunturiComponent - constructor')
  }
  ngAfterViewInit(): void {
    this.loadInitial();
  }

  ngOnInit(): void {

    // this.myRoles = this.userService.getMyRoles();
    // console.log('My roles: ', this.myRoles)
    console.log('AnunturiComponent - ngOnInit')
    // this.serviciuAnunturi.findAllAnunturi()
    //   .subscribe(anunturi => {
    //     this.anunturile = anunturi;

    //     console.log('de la server: ', anunturi);
    //   });
  }



  delAnunt(anunt: Anunt) { // delAnunt(id : number)

    console.log('stergem un anunt: ', anunt);
    this.serviciuAnunturi.deleteAnunt(anunt)
      .subscribe(anuntulSters => {
        console.log('am sters anuntul: ', anuntulSters);
        // this.anunturile = this.anunturile.filter(x => x.id != anunt.id)
        // this.anunturile.splice(this.anunturile.indexOf(anunt), 1)
        this.loadInitial();
      })
  }


  addAnunt() {
    // this.confirmareService.openDialog('hello');
    this.serviciuAnunturi.openDialog('Add Anunt').subscribe(result => {
      console.log('The dialog was closed: ', result);
      // this.message = result;
      if(result){
        // this.data.push(result);
        this.loadInitial();
      }
    });
  }

  addAnuntDocument() {
    // this.confirmareService.openDialog('hello');
    this.serviciuAnunturi.openDialogDocument('Add Anunt Document').subscribe(result => {
      console.log('The dialog was closed: ', result);
      // this.message = result;
      if(result){
        // this.data.push(result);
        this.loadInitial();
      }
    });
  }

  canISeeAnuntButton(){
    return this.userService.canISee(['ADMIN', 'COMANDANT', 'PROFESOR', 'SECRETAR']);
  }

  downloadAnunt(anunt: Anunt){
    console.log('should download: ', anunt);
    if(anunt.id){
      this.fileService.downloadAnunt(anunt.id);
    }
  }


}
