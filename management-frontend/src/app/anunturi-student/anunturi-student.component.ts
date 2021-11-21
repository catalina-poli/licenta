import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AnunturiService } from '../anunturi.service';
import { Anunt } from '../model/anunt';
import { merge, Observable, of as observableOf } from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-anunturi-student',
  templateUrl: './anunturi-student.component.html',
  styleUrls: ['./anunturi-student.component.css']
})
export class AnunturiStudentComponent implements OnInit, AfterViewInit {

  constructor(private serviciuAnunturi: AnunturiService,
    private changeDetectorRefs : ChangeDetectorRef) { }


// ---- paginare (tabel)
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
    
    this.sort.sortChange.subscribe(() => this.paginator? this.paginator.pageIndex = 0 : 0);
    merge(this.sort.sortChange,  this.paginator?  this.paginator.page : 0)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.serviciuAnunturi.findAllMatTable(
            this.sort? this.sort.active : '', this.sort? this.sort.direction  : 'asc', this.paginator? this.paginator.pageIndex : 0)
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

  }
}
// ---- ./paginare

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.loadInitial();
  }

}
