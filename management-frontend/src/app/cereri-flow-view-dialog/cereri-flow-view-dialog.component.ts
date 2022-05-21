import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { CereriService } from '../cereri.service';
import { FlowService } from '../flow.service';
import { Cerere } from '../model/cerere';


export interface DialogData {
  // message: string;
  // rezultat: any;
  id: number;
}


@Component({
  selector: 'app-cereri-flow-view-dialog',
  templateUrl: './cereri-flow-view-dialog.component.html',
  styleUrls: ['./cereri-flow-view-dialog.component.css']
})
export class CereriFlowViewDialogComponent implements OnInit {




  idCerere!: number;
  cerere!: Cerere;
  flowItems: any[] = [];
  grupuriUtilizatorCerere: any[] = [];


  constructor(private serviceCerere: CereriService, 
    private flowService: FlowService,
    public dialogRef: MatDialogRef<CereriFlowViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  calculAdmisRespinsPending() : string{
    let cerereAsAny = this.cerere as any;
    let intrerupere = cerereAsAny['cerereType']['intrerupere'];

    if(intrerupere == 1){
      for(let fi of this.flowItems){
        if(fi['status'] == 0){
          // this.statusGlobal = false;
          return 'RESPINS';
        }
      }
    }

    let respinsAll = true;
    let acceptAll = true;
    let pendingOne = false;
    for(let fi of this.flowItems){
      if(fi['status'] != 0){
        respinsAll = false;
      }
      if(fi['status'] != 1){
        acceptAll = false;
      }
      if(fi['status'] == 2){
        pendingOne = true;
      }
    }
    if(respinsAll){
      return 'RESPINS';
    }
    if(pendingOne){
      return 'PENDING';
    }
    return 'ACCEPTAT';
   
  }

  ngOnInit(): void {


    

      this.idCerere = this.data.id;
      this.serviceCerere.findById(this.idCerere)
        .subscribe(
          rez => {
            this.cerere = rez;
            console.log('cerere: ', this.cerere);
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
  }

}
