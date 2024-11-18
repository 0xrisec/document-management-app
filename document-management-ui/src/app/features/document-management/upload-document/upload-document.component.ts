import { Component } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { FileUploadModule, FileUploadEvent, FileUploadHandlerEvent } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { HttpClientModule } from '@angular/common/http';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { DocumentService } from '../../../core/services/document.service';

@Component({
  selector: 'app-upload-document',
  standalone: true,
  imports: [FileUploadModule, ButtonModule, BadgeModule, ProgressBarModule, ToastModule, HttpClientModule, CommonModule],
  templateUrl: './upload-document.component.html',
  styleUrl: './upload-document.component.css',
  providers: [MessageService]
})
export class UploadDocumentComponent {
  uploadedFiles: any[] = [];
  totalSize: number = 0;
  totalSizePercent: number = 0;

  constructor(private messageService: MessageService, private documentService: DocumentService) { }

  onUpload(event: FileUploadHandlerEvent) {
    this.uploadedFiles = [];
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      this.messageService.add({ severity: 'success', summary: 'File Uploaded', detail: "file uploaded" });
    }
  }
}
