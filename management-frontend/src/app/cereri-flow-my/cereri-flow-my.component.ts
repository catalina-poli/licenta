import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlowService } from '../flow.service';




@Component({
  selector: 'app-cereri-flow-my',
  templateUrl: './cereri-flow-my.component.html',
  styleUrls: ['./cereri-flow-my.component.css']
})
export class CereriFlowMyComponent implements OnInit {

  flowItems: any[] = [];
  constructor(private flowService: FlowService) { }
  cereriAndFlowItems: Map<number, any[]> = new Map<number, any[]>();
  dtosFlowItemsPrevious: any[] = [];

  ngOnInit(): void {

    this.flowService.findAllFlowPrevious()
      .subscribe(
        rez => {
          this.dtosFlowItemsPrevious = rez;
          console.log('dtos flow previous: ', this.dtosFlowItemsPrevious);
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
          for(let fi of this.flowItems){
            if(!this.cereriAndFlowItems.has(fi['cerere']['id'])){
              this.cereriAndFlowItems.set(fi['cerere']['id'], [fi]);
            }else{
              this.cereriAndFlowItems.get(fi['cerere']['id'])?.push(fi);
            }
          }
          console.log('cereri and flow items: ', this.cereriAndFlowItems);
          
        },
        err => {
          console.log('err: ', err);
        }
      );
  }

  rezolva(flowItem: any, status: boolean) {
    if(status){
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
