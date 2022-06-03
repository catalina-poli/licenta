
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CereriService } from 'src/app/cereri.service';
import { FileService } from 'src/app/services/file.service';
import { UserService } from 'src/app/user.service';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-table-detailed',
  templateUrl: './table-detailed.component.html',
  styleUrls: ['./table-detailed.component.css']
})
export class TableDetailedComponent implements OnInit, AfterViewInit {

  filtruTipCerere: string = 'all';
  tipuri: string[] = ['PERMISIE', 'INVOIRE', 'RESTANTA'];

  archived: boolean = false;
  isLoadingResults = true;
  isRateLimitReached = false;
  resultsLength = 0;

  constructor(private cereriService: CereriService,
    private usersService: UserService,
    private changeDetectorRefs: ChangeDetectorRef,

    private fileService: FileService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  displayedColumnsDetailed: string[] = ['id', 'datePosted', 'type', 'userAssociated', 'actions'];


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log('after view init')
    this.loadInitialDetailed();
  }
  cererileDetailed: any[] = [];

  loadInitialDetailed() {

    
    if (this.sort) {
      console.log('sort ok')
      this.filtruTipCerere = this.filtruTipCerere.toLowerCase();
      this.sort.sortChange.subscribe(() => this.paginator ? this.paginator.pageIndex = 0 : 0);
      merge(this.sort.sortChange, this.paginator ? this.paginator.page : 0)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoadingResults = true;



            return this.cereriService.findAllMatTableDetailed(this.filtruTipCerere,
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
          console.log('data detailed: ', data);
          this.cererileDetailed = data;
          
        });
      this.changeDetectorRefs.detectChanges();

    }else{
      console.log('no sort')
    }
    console.log('LOAD INITIAL DETAILED!')
  }

  selectOptiuneFiltru() {
    console.log('optiune curenta: ', this.filtruTipCerere);
    this.loadInitialDetailed();
  }
  viewArchiveDocument(statusArchived: boolean){
    this.archived = statusArchived;
    this.loadInitialDetailed();
  }

}
