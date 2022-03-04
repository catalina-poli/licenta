import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CereriService } from '../cereri.service';
import { FlowService } from '../flow.service';
import { Cerere } from '../model/cerere';

@Component({
  selector: 'app-cereri-flow-view',
  templateUrl: './cereri-flow-view.component.html',
  styleUrls: ['./cereri-flow-view.component.css']
})
export class CereriFlowViewComponent implements OnInit {

  idCerere!: number;
  cerere!: Cerere;
  flowItems: any[] = [];
  grupuriUtilizatorCerere: any[] = [];


  constructor(private serviceCerere: CereriService, private activatedRoute: ActivatedRoute,
    private flowService: FlowService) { }

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
    this.activatedRoute.params.subscribe(params => {
      this.idCerere = params['id'];
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
    });
  }
}
