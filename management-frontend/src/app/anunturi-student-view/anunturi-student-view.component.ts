import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnunturiService } from '../anunturi.service';
import { ConfirmareService } from '../confirmare.service';
import { Anunt } from '../model/anunt';

@Component({
  selector: 'app-anunturi-student-view',
  templateUrl: './anunturi-student-view.component.html',
  styleUrls: ['./anunturi-student-view.component.css']
})
export class AnunturiStudentViewComponent implements OnInit {


  anunt: Anunt | null = null;

  anuntEditare: Anunt | null = null;

  updateAnuntCancel(){
    this.anuntEditare = null;
  }

  updateAnunt() {
    console.log('trimitem pe server: ', this.anuntEditare);
    this.confirmareService.openDialog('hello');
    let debug = true;
    if(debug){
      return;
    }
    if (this.anuntEditare) {
      this.anuntService.updateAnunt(this.anuntEditare)
        .subscribe(anuntulSalvat => {
          console.log('Anuntul modificat pe server: ', anuntulSalvat);
          this.anunt = anuntulSalvat;
          this.anuntEditare = null;
          // this.loadInitial();
        })
    }
  }

  editAnunt(anunt: Anunt | null): void {
    this.anuntEditare = {...anunt};// creare copie parametru
    console.log('editam anuntul: ', this.anuntEditare)
  }
  constructor(private activatedRoute: ActivatedRoute, private anuntService: AnunturiService,
    private httpClient: HttpClient,
    private confirmareService : ConfirmareService) { }


   


  sendPdfRequestServer(anunt: Anunt) {

    let headers = new HttpHeaders();
    const url: string = 'http://localhost:8080/rest/anunturi/generate-anunt-pdf/' + anunt.id;
    headers = headers.set('Accept', 'application/pdf');
    this.httpClient.get(url, { headers: headers, responseType: 'blob' }).subscribe(
      (data: Blob) => {
        var file = new Blob([data], { type: 'application/pdf' })
        var fileURL = URL.createObjectURL(file);

// if you want to open PDF in new tab
        window.open(fileURL); 
        var a         = document.createElement('a');
        a.href        = fileURL; 
        a.target      = '_blank';
        a.download    = anunt.titlu+'.pdf';
        document.body.appendChild(a);
        a.click();
      },
    );

  }
  ngOnInit(): void {

    console.log('pas 1');
    this.activatedRoute.params.subscribe(
      parametri => {
        console.log('params are: ', parametri);
        this.anuntService.findOneAnunt(parametri['id_anunt'])
          .subscribe(anunt => {
            this.anunt = anunt;
            console.log('am incarcat anuntul: ', this.anunt);
            console.log('pas 2');
          });
      }
    );
    console.log('pas 3');
  }

}
