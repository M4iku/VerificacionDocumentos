import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

    private headers1 = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
        responseType: 'blob' as 'json'
    };

  constructor(private http: HttpClient) { }

  SolicitarPDF(value: any) {
    return this.http.post<Blob>('http://192.168.0.10:3736/Documents/VisualizarDTE', value,
        this.headers1).pipe(map(data => data));
  }
}
