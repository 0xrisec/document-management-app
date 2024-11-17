import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './features/dashboard/sidebar/sidebar.component'
import { DocumentListComponent } from './features/document-management/document-list/document-list.component';
import { DocumentViewerComponent } from './features/document-management/document-viewer/document-viewer.component';
import { UploadDocumentComponent } from './features/document-management/upload-document/upload-document.component';
import { QnaInterfaceComponent } from './features/qna-interface/qna-interface.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, UploadDocumentComponent, DocumentListComponent, DocumentViewerComponent, QnaInterfaceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'document-management-ui';
}
