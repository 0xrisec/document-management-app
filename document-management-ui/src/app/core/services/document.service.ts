import { HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { HttpService } from './http.service';
import { Document } from '../../interfaces/document.interface';
import { DocumentModel } from '../../models/doc.model';
import { MessageService } from 'primeng/api';
import { ApiEndpointsService } from './api-endpoints.service';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {
    public documents = signal<DocumentModel[]>([]); // Array of DocumentModel instances

    constructor(
        private httpService: HttpService,
        private messageService: MessageService,
        private apiEndpoints: ApiEndpointsService
    ) { }

    // Helper method for handling errors and showing appropriate messages
    private handleError(message: string, error: any) {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
        return of(null);  // Return an observable to maintain the stream
    }

    // Upload a file to the server
    uploadFile(url: string, file: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        return this.httpService.post(url, formData).pipe(
            catchError(err => this.handleError('Failed to upload file', err))
        );
    }

    // Create a new document
    createDocument(url: string, documentData: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpService.post(url, documentData, headers).pipe(
            catchError(err => this.handleError('Failed to create document', err))
        );
    }

    // Fetch documents from the API and update the signal state
    getDocuments(): void {
        const url = this.apiEndpoints.getEndpoint(this.apiEndpoints.document.base);
        this.httpService.get<DocumentModel[]>(url).pipe(
            catchError(err => {
                console.error(err);
                return of([]); // Return an empty array on error
            })
        ).subscribe({
            next: (res) => {
                const documents = res.map((doc: any) => new DocumentModel(
                    doc.id, doc.fileName, doc.contentUrl, doc.fileType, doc.author, doc.createdAt, doc.userId
                ));
                this.documents.set(documents);  // Update the signal state
            },
            error: (err) => {
                this.handleError('Failed to fetch documents', err);
            }
        });
    }

    // Update a document's details
    updateItem(item: DocumentModel): Observable<any> {
        const url = `${this.apiEndpoints.getEndpoint(this.apiEndpoints.document.base)}/${item.id}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpService.put(url, item, headers).pipe(
            catchError(err => this.handleError('Failed to update document', err))
        );
    }

    // Delete a document by ID
    deleteItem(itemId: string): void {
        const url = `${this.apiEndpoints.getEndpoint(this.apiEndpoints.document.base)}/${itemId}`;
        this.httpService.delete<DocumentModel[]>(url).pipe(
            catchError(err => {
                this.handleError('Failed to delete document', err);
                return of([]);  // Return an empty array if delete fails
            })
        ).subscribe({
            next: () => {
                this.documents.set(this.documents().filter(doc => doc.id !== itemId));
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Document Deleted', life: 3000 });
            }
        });
    }

    // Delete multiple documents
    deleteMultipleItems(itemIds: string[]): void {
        const url = `${this.apiEndpoints.getEndpoint(this.apiEndpoints.document.delete)}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        this.httpService.post(url, itemIds, headers).pipe(
            catchError(err => {
                this.handleError('Failed to delete documents', err);
                return of([]);  // Return an empty array if delete fails
            })
        ).subscribe({
            next: () => {
                this.documents.set(this.documents().filter((doc: any) => !itemIds.includes(doc.id)));
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Documents Deleted', life: 3000 });
            }
        });
    }
}
