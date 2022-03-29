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

  addCerere() {
    this.cereriService.openDialog('Adauga Cerere').subscribe(result => {
      console.log('The dialog was closed: ', result);
      if(result){
        this.cererile.push(result);
      }
    });
  }

}
