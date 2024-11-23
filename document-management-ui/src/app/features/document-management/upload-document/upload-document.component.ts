import { Component } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { FileUploadModule, FileUploadEvent, FileUploadHandlerEvent } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { DocumentService } from '../../../core/services/document.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-upload-document',
  standalone: true,
  imports: [RouterModule, FileUploadModule, ButtonModule, BadgeModule, ProgressBarModule, ToastModule, CommonModule],
  templateUrl: './upload-document.component.html',
  styleUrl: './upload-document.component.css',
  providers: [MessageService, DocumentService]
})
export class UploadDocumentComponent {
  uploadedFiles: any[] = [];
  totalSize: number = 0;
  totalSizePercent: number = 0;

  constructor(private messageService: MessageService, private documentService: DocumentService) { }

  onUpload(event: any) {
    this.documentService.documents.set([]);
    for (let file of event.files) {
      const url = event.originalEvent.body.document.contentUrl;
      this.uploadedFiles.push({ file, url });
      this.messageService.add({ severity: 'success', summary: 'File Uploaded', detail: "file uploaded" });
    }
  }
}
