import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AnunturiService } from '../anunturi.service';
import { ConfirmareService } from '../confirmare.service';
import { ConfirmareComponent } from '../confirmare/confirmare.component';
import { Anunt } from '../model/anunt';
import { EditAnuntDialogComponent } from './edit-anunt-dialog/edit-anunt-dialog.component';

@Component({
  selector: 'app-anunturi-student-view',
  templateUrl: './anunturi-student-view.component.html',
  styleUrls: ['./anunturi-student-view.component.css']
})
export class AnunturiStudentViewComponent implements OnInit {


  anunt: Anunt | null = null;

  sourceForPdf: string = '';

  constructor(private activatedRoute: ActivatedRoute, private anuntService: AnunturiService,
    private httpClient: HttpClient,
    private confirmareService: ConfirmareService,
    public dialog: MatDialog,
    private router: Router) { }



  editAnunt(anunt: Anunt | null): void {

    // this.dialog
    const dialogRef = this.dialog.open(EditAnuntDialogComponent, {
      width: '250px',
      data: { anunt: { ...anunt }, rezultat: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('result: ', result);
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        if (this.anunt) {
          console.log('should navigate');
          this.router.navigate(['/anunturi-student', this.anunt.id]);
        }
      });

    });
  }





  shouldLoadPdfFromServer: boolean = false;

  sendPdfRequestServer(anunt: Anunt) {

    let headers =
      new HttpHeaders({
        // 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Bearer ' + localStorage.getItem("CHEIE_OAUTH")
      });
    headers.set('Accept', 'application/pdf');
    const url: string = 'http://localhost:8080/rest/anunturi/generate-anunt-pdf/' + anunt.id;

    headers = headers.set('Accept', 'application/pdf');
    this.httpClient.get(url, { headers: headers, responseType: 'blob' }).subscribe(
      (data: Blob) => {
        var file = new Blob([data], { type: 'application/pdf' })
        var fileURL = URL.createObjectURL(file);

        // if you want to open PDF in new tab
        window.open(fileURL);
        var a = document.createElement('a');
        a.href = fileURL;
        a.target = '_blank';
        a.download = anunt.titlu + '.pdf';
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
            this.sourceForPdf = 'http://localhost:8080/rest/anunturi/generate-anunt-pdf/' + this.anunt.id + '?access_token=' + localStorage.getItem('CHEIE_OAUTH');
          });
      }
    );
    console.log('pas 3');
  }

}
