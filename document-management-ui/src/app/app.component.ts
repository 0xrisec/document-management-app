import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SocketIoModule } from 'ngx-socket-io';
import { SocketIoConfig } from 'ngx-socket-io/src/config/socket-io.config';
import { WrappedSocket } from 'ngx-socket-io/src/socket-io.service';
import { SocketService } from './core/services/socket.service';
import { SidebarComponent } from './features/dashboard/sidebar/sidebar.component'
import { DocumentListComponent } from './features/document-management/document-list/document-list.component';
import { DocumentViewerComponent } from './features/document-management/document-viewer/document-viewer.component';
import { UploadDocumentComponent } from './features/document-management/upload-document/upload-document.component';
import { QnaInterfaceComponent } from './features/qna-interface/qna-interface.component';
import { SocketModule } from './module/scoket.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    UploadDocumentComponent,
    DocumentListComponent,
    DocumentViewerComponent,
    QnaInterfaceComponent,
    SocketModule
  ],
  providers: [SocketService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'document-management-ui';
}
