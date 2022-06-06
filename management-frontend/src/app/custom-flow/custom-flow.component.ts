import { Component, OnInit } from '@angular/core';
import { CustomFlowService } from '../custom-flow.service';
import { DtoSaveCustomFlow } from '../model-dto/dto-save-custom-flow';
import { CustomFlowModel } from '../model/custom-flow';
import { UserService } from '../user.service';

@Component({
  selector: 'app-custom-flow',
  templateUrl: './custom-flow.component.html',
  styleUrls: ['./custom-flow.component.css']
})
export class CustomFlowComponent implements OnInit {


  newCustomFlow: CustomFlowModel = new CustomFlowModel();
  myCustomFlows: CustomFlowModel[] = [];
  users: any[] = [];
  usersSelected: any[] = [];
  constructor(private customFlowService: CustomFlowService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.userService.findAllUsers()
      .subscribe(
        rez => {
          this.users = rez;
        },
        err => {
          console.log('err: ', err);
        }
      );
    this.customFlowService.findAllMyCustomFlow()
      .subscribe(
        rez => {
          this.myCustomFlows = this.myCustomFlows;
        },
        err => {
          console.log('err: ', err);
        }
      );
  }



  saveMyCustomFlow(){
    
    let dto : DtoSaveCustomFlow = {
      customFlow: this.newCustomFlow,
      customFlowMembers: this.usersSelected
    };
    console.log('dto: ', dto);
    this.customFlowService.saveCustomFlow(dto)
      .subscribe(rez => {
        this.myCustomFlows.push(rez);
        console.log('saved: ', rez);
      }, err => {
        console.log('err saving custom flow: ', err);
      })
  }
}
