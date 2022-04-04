import { HttpClient, HttpParamsOptions, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadDownloadService {

  constructor(private http: HttpClient) { }




  downloadFileCerere(id: number): Observable<HttpResponse<Blob>> {
    // let options = new RequestOptions({responseType: ResponseContentType.Blob });

    const url = `http://localhost:8080/file-download/cerere/${id}`;
    return this.http.get(url, { responseType: 'blob', observe: 'response' });


  }
}
