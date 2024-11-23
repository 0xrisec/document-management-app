import { HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Document } from '../../interfaces/document.interface';
import { DocumentModel } from '../../models/doc.model';
import { MessageService } from 'primeng/api';
import { ApiEndpointsService } from './api-endpoints.service';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {
    public documents = signal<Document[]>([]);
    constructor(
        private httpService: HttpService,
        private messageService: MessageService,
        private apiEndpoints: ApiEndpointsService
    ) { }

    uploadFile(url: string, file: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        return this.httpService.post(url, formData);
    }

    createDocument(url: string, documentData: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpService.post(url, documentData, headers);
    }

    getDocuments() {
        const url = this.apiEndpoints.getEndpoint(this.apiEndpoints.document.base);
        this.httpService.get<DocumentModel[]>(url).subscribe({
            next: (res: any) => {
                this.documents.set(res.map((doc: any) => new DocumentModel(
                    doc.id, doc.fileName, doc.contentUrl, doc.fileType, doc.author, doc.createdAt, doc.userId
                )));
            },
            error: (err) => {
                console.error(err);
            }
        });
    }

    updateItem(item: DocumentModel) {
        const url = `${this.apiEndpoints.getEndpoint(this.apiEndpoints.document.base)}/${item.id}`;
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

    deleteItem(itemId: string) {
        const url = `${this.apiEndpoints.getEndpoint(this.apiEndpoints.document.base)}/${itemId}`;
        this.httpService.delete<DocumentModel[]>(url).subscribe({
            next: (res: any) => {
                this.documents.set(this.documents().filter(doc => doc.id !== itemId));
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Document Deleted', life: 3000 });
            },
            error: (err) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete document', life: 3000 });
            }
        });
    }

    deleteMultipleItems(itemIds: string[]) {
        const url = `${this.apiEndpoints.getEndpoint(this.apiEndpoints.document.delete)}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        this.httpService.post(url, itemIds, headers).subscribe({
            next: () => {
                this.documents.set(this.documents().filter((doc: any) => !itemIds.includes(doc.id)));
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Documents Deleted', life: 3000 });
            },
            error: (err) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete Documents', life: 3000 });
            }
        });
    }
}
