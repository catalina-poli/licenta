import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomFlowService } from 'src/app/custom-flow.service';
import { CustomFlowModel } from 'src/app/model/custom-flow';

@Component({
  selector: 'app-view-users-dialog',
  templateUrl: './view-users-dialog.component.html',
  styleUrls: ['./view-users-dialog.component.css']
})
export class ViewUsersDialogComponent implements OnInit {

  users: any[] = [];

  constructor(private customFlowService: CustomFlowService,
    @Inject(MAT_DIALOG_DATA) public data: CustomFlowModel) { }

  ngOnInit(): void {
    this.customFlowService.findCustomFlowMemberUsers(this.data ? this.data.id : -1)
    .subscribe(
      rezUsers => {
      
        this.users= rezUsers;
      },
      err => {
        console.log('err: ', err);
      }
    );
  }

}
