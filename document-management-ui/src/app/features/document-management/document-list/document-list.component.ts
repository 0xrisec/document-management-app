import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { DocumentService } from '../../../interfaces/document.service';
import { Document } from '../../../interfaces/document.interface';

@Component({
  selector: 'app-document-list',
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    InputTextModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    TagModule,
    RatingModule,
    ConfirmDialogModule
  ],
  standalone: true,
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
  providers: [MessageService, ConfirmationService, DocumentService],
})
export class DocumentListComponent implements OnInit {
  documentDialog: boolean = false;
  documents!: Document[];
  document!: Document;
  selectedDocuments!: Document[] | null;
  submitted: boolean = false;

  constructor(private documentService: DocumentService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.documentService.getDocuments().then((data: any) => (this.documents = data));
  }

  openNew() {
    this.document = {};
    this.submitted = false;
    this.documentDialog = true;
  }

  deleteSelectedDocuments() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected documents?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.documents = this.documents.filter((val) => !this.selectedDocuments?.includes(val));
        this.selectedDocuments = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Documents Deleted', life: 3000 });
      }
    });
  }

  editDocument(document: Document) {
    this.document = { ...document };
    this.documentDialog = true;
  }

  deleteDocument(document: Document) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + document.title + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.documents = this.documents.filter((val) => val.id !== document.id);
        this.document = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Document Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.documentDialog = false;
    this.submitted = false;
  }

  saveDocument() {
    this.submitted = true;

    if (this.document.title?.trim()) {
      if (this.document.id) {
        this.documents[this.findIndexById(this.document.id)] = this.document;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Document Updated', life: 3000 });
      } else {
        this.document.id = this.createId();
        this.documents.push(this.document);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Document Created', life: 3000 });
      }

      this.documents = [...this.documents];
      this.documentDialog = false;
      this.document = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.documents.length; i++) {
      if (this.documents[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
