import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dialog-table-flow-items',
  templateUrl: './dialog-table-flow-items.component.html',
  styleUrls: ['./dialog-table-flow-items.component.css']
})
export class DialogTableFlowItemsComponent implements OnInit {


  dtoFlowItemsPreviousCereriDocument: any;

  displayedColumnsDocument: string[] = ['idFlowItemDocument', 'superiorCerereDocument', 'statusCerereDocument',
  'canInterruptCerereDocument',  'motivCerereDocument'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  dataSource : MatTableDataSource<any> =  new MatTableDataSource<any>();

  ngOnInit(): void {
    
    console.log('dialog deschis pentru: ', this.data);
    this.dataSource =  new MatTableDataSource<any>(this.data.flowItemsICanSeeForCerere);;
  }

}
