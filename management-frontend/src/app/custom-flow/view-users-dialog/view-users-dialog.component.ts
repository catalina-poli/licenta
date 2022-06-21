import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomFlowService } from 'src/app/custom-flow.service';
import { CustomFlowModel } from 'src/app/model/custom-flow';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-view-users-dialog',
  templateUrl: './view-users-dialog.component.html',
  styleUrls: ['./view-users-dialog.component.css']
})
export class ViewUsersDialogComponent implements OnInit {

  users: any[] = [];
  allUsersPotential: any[] = [];
  allUsersSelectedFromPotential: any[] = [];


  rearangeOrderRequest(){
    console.log('users to rearange: ', this.users);
    this.customFlowService.editMemberOrder(this.users.map(x => x.id), this.data ? this.data.id : -1)
    .subscribe(
      rezModificare => { 
        console.log('successfully edited user order: ', rezModificare);
      },
      err => { console.log(err) }
      );
  }

  drop(event: any) {
    moveItemInArray(this.users, event.previousIndex, event.currentIndex);
    this.rearangeOrderRequest();
  }

  constructor(private customFlowService: CustomFlowService,
    @Inject(MAT_DIALOG_DATA) public data: CustomFlowModel, 
    private userService: UserService) { }

  ngOnInit(): void {
    this.userService.findAllUsersForCustomFlowAddMember(this.data ? this.data.id : -1)
      .subscribe(
        rez => {
          this.allUsersPotential = rez;
          console.log('all users potential: ', this.allUsersPotential);
        },
        err => {
          console.log('err: ', err);
        }
      );
    this.customFlowService.findCustomFlowMemberUsers(this.data ? this.data.id : -1)
      .subscribe(
        rezUsers => {

          this.users = rezUsers;
        },
        err => {
          console.log('err: ', err);
        }
      );
  }

  removeUser(user: any){
    console.log('removing user: ', user);
    this.users.splice(this.users.indexOf(user), 1);
    this.rearangeOrderRequest();
  }

}
