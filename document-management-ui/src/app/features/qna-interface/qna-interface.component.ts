import { Component, ViewChild, ElementRef, AfterViewChecked, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-qna-interface',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './qna-interface.component.html',
  styleUrl: './qna-interface.component.css'
})
export class QnaInterfaceComponent implements AfterViewChecked {
  @ViewChild('chatBody') chatBody: ElementRef | undefined;

  userInput: string = '';
  messages = [
    { text: 'Hello!', sent: true },
    { text: 'Hi there!', sent: false }
  ];
  newMessage = '';

  constructor(private renderer: Renderer2) { }

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

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ text: this.newMessage, sent: true });
      this.newMessage = '';
      setTimeout(() => {
        this.messages.push({ text: 'This is a response.', sent: false });
      }, 1000);
    }
  }
}
