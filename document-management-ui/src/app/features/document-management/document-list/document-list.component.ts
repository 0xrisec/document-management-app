import { Component, effect, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DocumentService } from '../../../core/services/document.service';
import { DOC_CONFIGS } from '../../../metadata/entity-config';
import { NoDataComponent } from '../../../shared/components/no-data/no-data.component';
import { CustomTableComponent } from '../../../shared/custom-table/custom-table.component';

@Component({
  selector: 'app-document-list',
  imports: [
    CustomTableComponent,
    NoDataComponent
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
    if (!this.documentService.documents()?.length)
      this.documentService.getDocuments();
    this.entityType = this.config.type;
  }

  deleteItem(item: any) {
    this.documentService.deleteItem(item.id)
  }

  updateItem(item: any) {
    this.documentService.updateItem(item)
  }

  deleteMultipleItems(selectedItems: any) {
    const itemIds = selectedItems.map((item: any) => item.id);
    this.documentService.deleteMultipleItems(itemIds).subscribe({
      next: () => {
        this.data = this.data.filter((val) => !selectedItems.includes(val.id));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Items Deleted', life: 3000 });
      },
      error: (err) => {
        console.error(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete items', life: 3000 });
      }
    });
  }
}
