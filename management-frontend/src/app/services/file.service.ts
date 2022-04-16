import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileUploadDownloadService } from '../file-upload-download.service';
import { saveAs as importedSaveAs } from "file-saver";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http : HttpClient,
    private fileUploadDownloadService: FileUploadDownloadService) { }


  downloadSablon(idSablon: number) {

    console.log('download document pentru cerere: ', idSablon);
    this.fileUploadDownloadService.downloadFileSablon(idSablon)
      .subscribe(fileDownloaded => {
        console.log('file response: ', fileDownloaded);
        console.log('headers CD: ', fileDownloaded.headers.get('Content-Disposition'));
        console.log('nume fisier: ', fileDownloaded.headers.get('NumeFisier'));
        const headerNumeFisier = fileDownloaded.headers.get('NumeFisier');
        const numeFisier = headerNumeFisier ? headerNumeFisier : 'download';
        const blobBody: Blob = fileDownloaded.body ? fileDownloaded.body : new Blob;
        importedSaveAs(blobBody, numeFisier);
      });
  }

  
  uploadFileWithoutSubscribe(fileToUpload: File | null,  url: string) : Observable<any> {
    let upload$ = of();
    
    if (fileToUpload) {

      let fileName: string = fileToUpload.name;

      const formData = new FormData();

      formData.append("file", fileToUpload);

      upload$ = this.http.post(url, formData);

      

    }
    return upload$;
  }

  uploadFile(fileToUpload: File | null,  url: string) {
    if (fileToUpload) {

      let fileName: string = fileToUpload.name;

      const formData = new FormData();

      formData.append("file", fileToUpload);

      const upload$ = this.http.post(url, formData);

      upload$.subscribe(
        rez => {
          console.log('file successfully uploaded: ', rez);
        },
        err => {
          console.log('error: ', err);
        }
      );

    }
  }
}
