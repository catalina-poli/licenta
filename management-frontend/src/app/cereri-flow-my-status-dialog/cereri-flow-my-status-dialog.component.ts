import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlowService } from '../flow.service';

export interface DialogData {
  message: string;
  rezultat: any;
  flowItem: any;
  status: boolean;
}

@Component({
  selector: 'app-cereri-flow-my-status-dialog',
  templateUrl: './cereri-flow-my-status-dialog.component.html',
  styleUrls: ['./cereri-flow-my-status-dialog.component.css']
})
export class CereriFlowMyStatusDialogComponent implements OnInit {

  constructor(private flowService: FlowService,
    public dialogRef: MatDialogRef<CereriFlowMyStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  ngOnInit(): void {
    console.log('DATA DIALOG: ', this.data);
  }

  
  // dialog
  motiv: any = '';
  onNoClick(): void {
    console.log('NO CLICK HAS BEEN CLICKED');
    this.data.rezultat = false;
    this.dialogRef.close();
  }

  updateOkClicked(){
    console.log('OK UPDATE: ', this.motiv)
    this.rezolva(this.data['flowItem'], false);
  }

  rezolva(flowItem: any, status: boolean) {
    console.log('flow item: ', flowItem);
    let statusNou = status ? 1 : 0;
    console.log('status nou: ', statusNou);
    const dto: any = {
      idFlowItem: flowItem['id'],
      statusItem: statusNou,
      motiv: this.motiv
    };
    console.log('updating: ', dto);

    this.flowService.modifyFlowItemStatus(dto)
      .subscribe(
        rez => {
          console.log('successfully modified status: ', rez);
          flowItem['status'] = statusNou;
        },
        err => {
          console.log('eroare: ', err)
        });



  }

}
