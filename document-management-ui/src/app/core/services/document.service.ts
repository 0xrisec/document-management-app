import { HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Document } from '../../interfaces/document.interface';
import { DocumentModel } from '../../models/doc.model';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {
    public documents = signal<Document[]>([]);
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

    getDocuments() {
        const url = "http://localhost:3000/document/"
        this.httpService.get<DocumentModel[]>(url).subscribe({
            next: (res: any) => {
                this.documents.set(res.map((doc:any) => new DocumentModel(
                    doc.id, doc.fileName, doc.contentUrl, doc.fileType, doc.author, doc.createdAt, doc.userId
                )));
            },
            error: (err) => {
                console.error(err);
            }
        });
    }

    deleteItem(itemId:string){
        const url = "http://localhost:3000/document/" + itemId
        this.httpService.delete<DocumentModel[]>(url).subscribe({
            next: (res: any) => {
                console.log(res);
            },
            error: (err) => {
                console.error(err);
            }
        });
    }

    updateItem(item: DocumentModel){
        const url = `http://localhost:3000/document/${item.id}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        this.httpService.put(url, item, headers).subscribe({
            next: (res: any) => {
                console.log(res);
            },
            error: (err) => {
                console.error(err);
            }
        });
    }
}
