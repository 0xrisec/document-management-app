import { Component, ViewChild, ElementRef, AfterViewChecked, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule
import { SocketService } from '../../core/services/socket.service';

@Component({
  selector: 'app-qna-interface',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './qna-interface.component.html',
  styleUrl: './qna-interface.component.css'
})
export class QnaInterfaceComponent implements AfterViewChecked, OnInit {
  @ViewChild('chatBody') chatBody: ElementRef | undefined;

  messages = [
    { text: 'Hello!', sent: true },
    { text: 'Hi there!', sent: false }
  ];
  newMessage = '';
  answer!: string;
  error: string | null = null;

  constructor(private renderer: Renderer2, private socketService: SocketService) { }

  ngAfterViewChecked() {
    // Scroll to the bottom of the chat body after the view has been updated
    if (this.chatBody) {
      this.renderer.setProperty(
        this.chatBody.nativeElement,
        'scrollTop',
        this.chatBody.nativeElement.scrollHeight
      );
    }
  }

  ngOnInit() {
    this.connectServer()
    this.socketService.getAnswer().subscribe((data: any) => {
      if (data) {
        this.answer = data?.msg?.answer;
        if (this.answer)
          this.messages.push({ text: this.answer, sent: false });
      }
    });

    this.socketService.getError().subscribe((err: any) => {
      if (err) this.error = err.error;
    });
  }

  // This method is used to create Socket-IO connection with the server.
  private connectServer(): void {
    const data: any = {
    }
    this.socketService.handleConnectionEvents(data);
  }

  sendMessage() {
    this.messages.push({ text: this.newMessage, sent: true });
    this.socketService.askQuestion(this.newMessage);
    this.newMessage = '';
  }
}
