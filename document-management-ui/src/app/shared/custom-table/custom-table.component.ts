import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-custom-table',
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
    ConfirmDialogModule,
    RouterModule
  ],
  standalone: true,
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css'],
  providers: [MessageService, ConfirmationService],
})

export class CustomTableComponent implements OnInit {
  @Input() entityType!: string;
  @Input() data!: any[];
  @Input() config: any;
  isChat: boolean = false;
  selectedItems: any[] | null = null;
  dialogVisible: boolean = false;
  currentItem: any;
  submitted: boolean = false;

  get globalFilterFields(): string[] {
    return this.config?.fields.map((field: any) => field.key) || [];
  }

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    console.log(this.data);
    this.isChat = this.config.isChat;
  }

  openNew() {
    this.submitted = false;
    this.dialogVisible = true;
  }

  deleteSelectedItems() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected items?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.data = this.data.filter((val) => !this.selectedItems?.includes(val));
        this.selectedItems = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Items Deleted', life: 3000 });
      }
    });
  }

  editItem(item: any) {
    this.currentItem = { ...item };
    this.dialogVisible = true;
  }

  deleteItem(item: any) {
    if (this.config)
      this.confirmationService.confirm({
        message: `Are you sure you want to delete ${item[this.config.fields[0].key]}?`,
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.data = this.data.filter((val) => val.id !== item.id);
          this.currentItem = {};
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Item Deleted', life: 3000 });
        }
      });
  }

  hideDialog() {
    this.dialogVisible = false;
    this.submitted = false;
  }

  saveItem() {
    this.submitted = true;

    if (this.config && this.currentItem[this.config?.fields[0].key]?.trim()) {
      if (this.currentItem.id) {
        this.data[this.findIndexById(this.currentItem.id)] = this.currentItem;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Item Updated', life: 3000 });
      } else {
        this.currentItem.id = this.createId();
        this.data.push(this.currentItem);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Item Created', life: 3000 });
      }

      this.data = [...this.data];
      this.dialogVisible = false;
      this.currentItem = {};
    }
  }

  findIndexById(id: string): number {
    return this.data.findIndex(item => item.id === id);
  }

  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
