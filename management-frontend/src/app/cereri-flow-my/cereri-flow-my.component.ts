import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FileUploadDownloadService } from '../file-upload-download.service';
import { FlowService } from '../flow.service';
import { saveAs as importedSaveAs } from "file-saver";
import { MatTableDataSource } from '@angular/material/table';
import { DialogTableFlowItemsComponent } from './dialog-table-flow-items/dialog-table-flow-items.component';




@Component({
  selector: 'app-cereri-flow-my',
  templateUrl: './cereri-flow-my.component.html',
  styleUrls: ['./cereri-flow-my.component.css']
})
export class CereriFlowMyComponent implements OnInit {

  selectedStatusFilter: number = 2;

  statusDropdownOptions: any[] = [
    { status: 0, text: "RESPINS" },
    { status: 1, text: "ADMIS" },
    { status: 2, text: "PENDING" }
  ];

  flowItems: any[] = [];
  constructor(private flowService: FlowService,
    private fileUploadDownloadService: FileUploadDownloadService,
    public dialog: MatDialog
  ) { }
  cereriAndFlowItems: Map<number, any[]> = new Map<number, any[]>();
  cereriDetailedAndFlowItems: Map<number, any[]> = new Map<number, any[]>();
  cereriDocumentAndFlowItems: Map<number, any[]> = new Map<number, any[]>();
  dtosFlowItemsPrevious: any[] = [];

  dtosFlowItemsPreviousCereriDocument: any[] = [];
  dataSource_dtosFlowItemsPreviousCereriDocument: MatTableDataSource<any> = new MatTableDataSource<any>();

  dtosFlowItemsPreviousCereriDetailed: any[] = [];
  dataSource_dtosFlowItemsPreviousCereriDetailed: MatTableDataSource<any> = new MatTableDataSource<any>();

  displayedColumnsDocument: string[] = ['idCerereDocument', 'typeCerereDocument', 'emailCerereDocument', 'actionsCerereDocument'];
  displayedColumnsDetailed: string[] = ['idCerereDetailed', 'typeCerereDetailed', 'emailCerereDetailed', 'actionsCerereDetailed'];


  shouldDisplayCerereDetailed(idCerere: any, typeCerere: string): boolean {
    // cereriDetailedAndFlowItems
    // cereriDocumentAndFlowItems
    // let shouldDisplay: boolean = true;
    if (typeCerere == 'detailed') {
      let cerereFlowItems = this.cereriDetailedAndFlowItems.get(idCerere) || [];
      for (let fi of cerereFlowItems) {
        if (fi.status != this.selectedStatusFilter) {
          return false;
        }
      }
      return true;
    }
    let cerereFlowItems = this.cereriDocumentAndFlowItems.get(idCerere) || [];
    for (let fi of cerereFlowItems) {
      if (fi.status != this.selectedStatusFilter) {
        return false;
      }
    }
    return true;
  }

  openDialogFlowItems(dto: any) {
    console.log('should open dialog for: ', dto);
    const dialogRef = this.dialog.open(DialogTableFlowItemsComponent, {
      minWidth: 800,

      data: dto
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: ', result);

    });
  }

  ngOnInit(): void {

    this.flowService.findAllFlowPrevious()
      .subscribe(
        rez => {
          this.dtosFlowItemsPrevious = rez;
          console.log('dtos flow previous: ', this.dtosFlowItemsPrevious);
          for (let dto of this.dtosFlowItemsPrevious) {
            if (dto.cerere) {
              this.dtosFlowItemsPreviousCereriDocument.push(dto);
            }
            if (dto.cerereDetailed) {
              this.dtosFlowItemsPreviousCereriDetailed.push(dto);

            }
          }
          console.log('dto cereri document previous: ', this.dtosFlowItemsPreviousCereriDocument);
          console.log('dto cereri DETAILED previous: ', this.dtosFlowItemsPreviousCereriDetailed);
          this.dataSource_dtosFlowItemsPreviousCereriDocument = new MatTableDataSource<any>(this.dtosFlowItemsPreviousCereriDocument);
          this.dataSource_dtosFlowItemsPreviousCereriDetailed = new MatTableDataSource<any>(this.dtosFlowItemsPreviousCereriDetailed);
          console.log('dtosFlowItemsPreviousCereriDetailed: ', this.dtosFlowItemsPreviousCereriDetailed)
        },
        err => {
          console.log('err: ', err);
        }
      );

    this.flowService.findAllFlowByMe()
      .subscribe(
        rez => {
          console.log('my flow items: ', rez);
          this.flowItems = rez;
          for (let fi of this.flowItems) {
            if (fi['cerere']) {
              if (!this.cereriDocumentAndFlowItems.has(fi['cerere']['id'])) {
                this.cereriDocumentAndFlowItems.set(fi['cerere']['id'], [fi]);
              } else {
                this.cereriDocumentAndFlowItems.get(fi['cerere']['id'])?.push(fi);
              }
            }
            if (fi['cerereDetailed']) {
              if (!this.cereriDetailedAndFlowItems.has(fi['cerereDetailed']['id'])) {
                this.cereriDetailedAndFlowItems.set(fi['cerereDetailed']['id'], [fi]);
              } else {
                this.cereriDetailedAndFlowItems.get(fi['cerereDetailed']['id'])?.push(fi);
              }
            }
          }
          console.log('cereri document and flow items: ', this.cereriDocumentAndFlowItems);
          console.log('cereri detailed and flow items: ', this.cereriDetailedAndFlowItems);

        },
        err => {
          console.log('err: ', err);
        }
      );
  }

  downloadCerere(dto: any) {
    const idCerere = dto['cerere']['id'];
    console.log('download document pentru cerere: ', idCerere);
    this.fileUploadDownloadService.downloadFileCerere(idCerere)
      .subscribe(fileDownloaded => {
        console.log('file response: ', fileDownloaded);
        console.log('headers CD: ', fileDownloaded.headers.get('Content-Disposition'));
        console.log('nume fisier: ', fileDownloaded.headers.get('NumeFisier'));
        const headerNumeFisier = fileDownloaded.headers.get('NumeFisier');
        const numeFisier = headerNumeFisier ? headerNumeFisier : 'download';
        const blobBody: Blob = fileDownloaded.body ? fileDownloaded.body : new Blob;
        importedSaveAs(blobBody, numeFisier);
      });
  }


  rezolva(flowItem: any, status: boolean) {
    if (status) {
      const dto: any = {
        idFlowItem: flowItem['id'],
        statusItem: 1,
        motiv: null
      };
      console.log('updating: ', dto);
      this.flowService.modifyFlowItemStatus(dto)
        .subscribe(rez => {
          console.log('successfully updated: ', rez);
          flowItem['status'] = 1;
        },
          err => {
            console.log('err: ', err);
          });
      return;
    }
    this.flowService.openDialog('Admite / Respinge', flowItem, status).subscribe(result => {
      console.log('The dialog was closed: ', result);
      // this.message = result;
      if (result) {
        // this.cererile.push(result);
      }
    });
  }




}
