import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FileUploadDownloadService } from '../file-upload-download.service';
import { FlowService } from '../flow.service';
import { saveAs as importedSaveAs } from "file-saver";




@Component({
  selector: 'app-cereri-flow-my',
  templateUrl: './cereri-flow-my.component.html',
  styleUrls: ['./cereri-flow-my.component.css']
})
export class CereriFlowMyComponent implements OnInit {

  flowItems: any[] = [];
  constructor(private flowService: FlowService, private fileUploadDownloadService: FileUploadDownloadService) { }
  cereriAndFlowItems: Map<number, any[]> = new Map<number, any[]>();
  cereriDetailedAndFlowItems: Map<number, any[]> = new Map<number, any[]>();
  cereriDocumentAndFlowItems: Map<number, any[]> = new Map<number, any[]>();
  dtosFlowItemsPrevious: any[] = [];
  dtosFlowItemsPreviousCereriDocument: any[] = [];
  dtosFlowItemsPreviousCereriDetailed: any[] = [];

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

  downloadCerere(fi: any) {
    const idCerere = fi['cerere']['id'];
    console.log('download document pentru cerere: ', idCerere);
    this.fileUploadDownloadService.downloadFileCerere(idCerere)
      .subscribe(fileDownloaded => {
        console.log('file response: ', fileDownloaded);
        console.log('headers CD: ', fileDownloaded.headers.get('Content-Disposition'));
        console.log('nume fisier: ', fileDownloaded.headers.get('NumeFisier'));
        const headerNumeFisier = fileDownloaded.headers.get('NumeFisier') ;
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
