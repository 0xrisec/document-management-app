import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {
    constructor(private httpService: HttpService) { }

    uploadFile(url:string, file: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        return this.httpService.post(url, formData);
    }

    createDocument(url:string, documentData:any):Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpService.post(url, documentData, headers);
    }
}
