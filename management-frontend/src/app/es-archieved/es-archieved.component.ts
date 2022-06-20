import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EsSearchResultDto } from '../model-dto/es-search-result-dto';
import { EsSearchService } from '../services/es-search.service';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-es-archieved',
  templateUrl: './es-archieved.component.html',
  styleUrls: ['./es-archieved.component.css']
})
export class EsArchievedComponent implements OnInit, AfterViewInit {

  
  displayedColumns: string[] = ['id',
    'idCerereSalvataDocumentOrDetailed',
    'userEmail',
    'typeCerere',
    'documentOrDetailed',
    "localitate",
    "motiv",
    "judet",
    'actionsCol'
  ];
  // "id": "onbsXIEBbmuWyZzeSbK1",
  // "idCerereSalvataDocumentOrDetailed": null,
  // "userEmail": "someuser@gmail.com",
  // "typeCerere": null,
  // "documentOrDetailed": "CERERE_DETAILED",
  // "localitate": null,
  // "motiv": "Doresc vacanta",
  // "judet": null

  
  constructor(private esService: EsSearchService,
    private changeDetectorRefs: ChangeDetectorRef) { }
  ngAfterViewInit(): void {
    this.loadInitial();
  }

  ngOnInit(): void {
  }


  // ---- paginare 
  categorieSearch: string = 'MOTIV';
  cuvantCautat: string = '';
  data: EsSearchResultDto[] = [];

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
            return this.esService.searchMatTable(
              this.cuvantCautat,
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

    } else {
      console.log('anunturi no sort');
    }
  }
  // ---- ./paginare


}
