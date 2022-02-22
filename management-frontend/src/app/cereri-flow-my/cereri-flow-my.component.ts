import { Component, OnInit } from '@angular/core';
import { FlowService } from '../flow.service';

@Component({
  selector: 'app-cereri-flow-my',
  templateUrl: './cereri-flow-my.component.html',
  styleUrls: ['./cereri-flow-my.component.css']
})
export class CereriFlowMyComponent implements OnInit {

  flowItems: any[] = [];
  constructor(private flowService: FlowService) { }

  ngOnInit(): void {
    this.flowService.findAllFlowByMe()
      .subscribe(
        rez=>{
          console.log('my flow items: ', rez);
          this.flowItems = rez;
        },
        err=>{
          console.log('err: ', err);          
        }
      );
  }

}
