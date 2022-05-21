import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CereriFlowViewDialogComponent } from '../cereri-flow-view-dialog/cereri-flow-view-dialog.component';
import { CereriService } from '../cereri.service';
import { FlowService } from '../flow.service';
import { GroupService } from '../group.service';
import { Cerere } from '../model/cerere';

@Component({
  selector: 'app-cereri-flow',
  templateUrl: './cereri-flow.component.html',
  styleUrls: ['./cereri-flow.component.css']
})
export class CereriFlowComponent implements OnInit {

  idCerere!: number;
  cerere!: Cerere;
  flowItems: any[] = [];
  groups: any = [];

  constructor(private serviceCerere: CereriService, private activatedRoute: ActivatedRoute,
    private flowService: FlowService, private groupService: GroupService,
    public dialog: MatDialog) { }

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

              this.serviceCerere.findAllGrupuriForCerere(this.idCerere)
                .subscribe(
                  groups=>{
                    console.log('groups: ', groups);
                    this.groups = groups;
                  },
                  err => {
                    console.log('could not load groups for cerere, err = ', err);
                  }
                );
            },
            err => {
              console.log('err: ', err);
            }
          );
    });
  }

  viewStatusDialog(){
    this.openDialog();
  }
  openDialog(): Observable<any> {

    const dialogRef = this.dialog.open(CereriFlowViewDialogComponent, {
      width: '100%',
      data: {id : this.idCerere}  //  rezultat : {}
    });

    return dialogRef.afterClosed();
  }

}
