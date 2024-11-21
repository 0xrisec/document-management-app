import { Component, effect, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DocumentService } from '../../../core/services/document.service';
import { DOC_CONFIGS } from '../../../metadata/entity-config';
import { CustomTableComponent } from '../../../shared/custom-table/custom-table.component';

@Component({
  selector: 'app-document-list',
  imports: [
    CustomTableComponent
  ],
  standalone: true,
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class DocumentListComponent implements OnInit {
  @Input() config: any = DOC_CONFIGS;
  entityType!: string;
  data: any[] = [];

  constructor(private documentService: DocumentService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    effect(() => {
      const docs = this.documentService.documents();
      this.data = docs;
    });
  }

  ngOnInit() {
    if(!this.documentService.documents()?.length)
      this.documentService.getDocuments();
    this.entityType = this.config.type;
  }

  deleteItem(item:any) {
    this.documentService.deleteItem(item.id)
    // this.data = this.data.filter((val) => !this.selectedItems?.includes(val));
  }

  updateItem(item:any) {
    this.documentService.updateItem(item)
  }
}
