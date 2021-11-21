import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CereriService } from '../cereri.service';

@Component({
  selector: 'app-cereri',
  templateUrl: './cereri.component.html',
  styleUrls: ['./cereri.component.css']
})
export class CereriComponent implements OnInit {

  cererile : any[] = [];
  cerereNoua : any = {
    typeCerere : ''
  };

  tipuri : string[] = ['permisie', 'invoire', 'restanta'];

  constructor(private cereriService : CereriService) { }

  ngOnInit(): void {
  
      this.cereriService.findAllCereri().subscribe(rez => {
        this.cererile = rez;
      });
  }

  // save(){
  //   console.log('salvam pe server: ', this.cerereNoua);
  //   this.cereriService.saveCerere(this.cerereNoua)
  //     .subscribe(
  //       rez=> {
  //         console.log('dupa save: ', rez);
  //         this.cererile.push(rez);
  //       },
  //       err => {
  //         console.log('err: ', err);
  //       }
  //     );
  // }
  addCerere() {
    // this.confirmareService.openDialog('hello');
    this.cereriService.openDialog('Add Anunt').subscribe(result => {
      console.log('The dialog was closed: ', result);
      // this.message = result;
      if(result){
        // this.data.push(result);
        // this.cereriService.findAllCereri().subscribe(rez => {
        //   this.cererile = rez;
        // });
        this.cererile.push(result);
      }
    });
  }

}
