import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { CereriService } from '../cereri.service';
import { FlowService } from '../flow.service';
import { Cerere } from '../model/cerere';
import { CerereDetailed } from '../model/cerere-detailed';


export interface DialogData {
  // message: string;
  // rezultat: any;
  id: number;
  cerereDocumentOrDetailed: string;
}


@Component({
  selector: 'app-cereri-flow-view-dialog',
  templateUrl: './cereri-flow-view-dialog.component.html',
  styleUrls: ['./cereri-flow-view-dialog.component.css']
})
export class CereriFlowViewDialogComponent implements OnInit {




  idCerere!: number;
  cerere!: Cerere;
  cerereDetailed!: CerereDetailed;
  flowItems: any[] = [];
  grupuriUtilizatorCerere: any[] = [];
  isArchived: boolean = false;


  constructor(private serviceCerere: CereriService,
    private flowService: FlowService,
    public dialogRef: MatDialogRef<CereriFlowViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  calculAdmisRespinsPending(): string {
    let cerereAsAny = this.cerere ? this.cerere as any : this.cerereDetailed as any;
    
    // let intrerupere = cerereAsAny['cerereType']['intrerupere'];
    // let intrerupere = false;
    for (let fi of this.flowItems) {
      if(fi['canInterrupt'] == 1 && fi['status'] == 0){
        // intrerupere = true;
        return 'RESPINS';
      }
    }
    // if (intrerupere) {
    //       // this.statusGlobal = false;
    //       return 'RESPINS';
    // }

    let respinsAll = true;
    let acceptAll = true;
    let pendingOne = false;
    for (let fi of this.flowItems) {
      if (fi['status'] != 0) {
        respinsAll = false;
      }
      if (fi['status'] != 1) {
        acceptAll = false;
      }
      if (fi['status'] == 2) {
        pendingOne = true;
      }

    }
    if (respinsAll) {
      return 'RESPINS';
    }
    if (pendingOne) {
      return 'PENDING';
    }
    return 'ACCEPTAT';

  }

  ngOnInit(): void {

    // TODO: cerere (document) VS cerere detailed => vedem doar cererile document


    this.idCerere = this.data.id;
    if (this.data.cerereDocumentOrDetailed == 'CERERE_DOCUMENT') {
      this.serviceCerere.findById(this.idCerere)
        .subscribe(
          rez => {
            this.cerere = rez;
            this.isArchived = this.cerere.archived == 1;
            console.log('cerere x ', this.cerere);
          },
          err => {
            console.log('err: ', err);
          }
        );
      this.serviceCerere.findAllGrupuriForCerere(this.idCerere)
        .subscribe(
          rez => {
            this.grupuriUtilizatorCerere = rez;
            console.log('Grupurile user-ului: ', this.grupuriUtilizatorCerere);
          },
          err => {
            console.log('err: ', err);
          }
        );
      this.flowService.findAllFlowByCerere(this.idCerere)
        .subscribe(
          rez => {
            this.flowItems = rez;
            console.log('FLOW ITEMS: ', this.flowItems);

          },
          err => {
            console.log('err: ', err);
          }
        );
    }else{
      this.serviceCerere.findDetailedById(this.idCerere)
        .subscribe(
          rez => {
            this.cerereDetailed = rez;
            console.log('cerere detailed: ', this.cerereDetailed);
            this.isArchived = this.cerereDetailed.archived == 1;
            console.log('cerere x ', this.cerere);
          },
          err => {
            console.log('err: ', err);
          }
        );


        // TODO: edit!!!! merge pentru cerere document nu pentru detailed
      this.serviceCerere.findAllGrupuriForCerere(this.idCerere)
        .subscribe(
          rez => {
            this.grupuriUtilizatorCerere = rez;
            console.log('Grupurile user-ului: ', this.grupuriUtilizatorCerere);
          },
          err => {
            console.log('err: ', err);
          }
        );
      this.flowService.findAllFlowByCerereDetailed(this.idCerere)
        .subscribe(
          rez => {
            this.flowItems = rez;
            console.log('FLOW ITEMS: ', this.flowItems);

          },
          err => {
            console.log('err: ', err);
          }
        );
    }
  }

  arhivare() {
    // archiveCerere
    // TODO: pentru document SAU detailed
    if(this.cerere){
    this.serviceCerere.archiveCerere('CERERE_DOCUMENT', this.cerere.id)
      .subscribe(
        rez => {
          console.log('arhivare:', rez);
        },
        err => {
          console.log(err);
        }
      );
    }else{
      this.serviceCerere.archiveCerere('CERERE_DETAILED', this.cerereDetailed.id)
      .subscribe(
        rez => {
          console.log('arhivare:', rez);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

}
