import { Component } from '@angular/core';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

@Component({
  selector: 'app-document-viewer',
  standalone: true,
  imports: [NgxDocViewerModule],
  templateUrl: './document-viewer.component.html',
  styleUrl: './document-viewer.component.css'
})
export class DocumentViewerComponent {
  doc: string = 'https://pdfobject.com/pdf/sample.pdf';
}
