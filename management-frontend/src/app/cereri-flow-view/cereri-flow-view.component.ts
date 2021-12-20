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


  constructor(private serviceCerere: CereriService, private activatedRoute: ActivatedRoute,
    private flowService: FlowService) { }

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
