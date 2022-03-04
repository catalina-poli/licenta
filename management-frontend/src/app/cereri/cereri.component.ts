import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CereriService } from '../cereri.service';
import { Cerere } from '../model/cerere';

@Component({
  selector: 'app-cereri',
  templateUrl: './cereri.component.html',
  styleUrls: ['./cereri.component.css']
})
export class CereriComponent implements OnInit {

  filtruTipCerere : string = '';

  cererileAfisate : Cerere[] = [];
  cererile : Cerere[] = [];
  cerereNoua : any = {
    typeCerere : ''
  };

  tipuri : string[] = ['permisie', 'invoire', 'restanta'];

  constructor(private cereriService : CereriService) { }

  selectOptiuneFiltru(){
    console.log('optiune curenta: ', this.filtruTipCerere);
    if(this.filtruTipCerere == 'all'){
      this.cererileAfisate = [...this.cererile];
    }else{
      this.cererileAfisate = this.cererile.filter(x => x.typeCerere == this.filtruTipCerere);
    }
  }

  ngOnInit(): void {
  
      this.cereriService.findAllCereri().subscribe(rez => {
        this.cererile = rez;
        this.cererileAfisate = [...this.cererile];//copie
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
    this.cereriService.openDialog('Adauga Cerere').subscribe(result => {
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
