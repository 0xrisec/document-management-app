import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentSidebarComponent } from '../document-management/document-sidebar/document-sidebar.component';
import { DocumentViewerComponent } from '../document-management/document-viewer/document-viewer.component';
import { QnaInterfaceComponent } from '../qna-interface/qna-interface.component';

@Component({
  selector: 'app-doc-qna-interface',
  standalone: true,
  imports: [DocumentViewerComponent, QnaInterfaceComponent, DocumentSidebarComponent],
  templateUrl: './doc-qna-interface.component.html',
  styleUrl: './doc-qna-interface.component.css'
})
export class DocQnaInterfaceComponent implements OnInit  {
  fileUrl: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.fileUrl = decodeURIComponent(params.get('url') || '');
      console.log('File URL:', this.fileUrl);
    });
  }
}
