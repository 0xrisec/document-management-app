import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { WrappedSocket } from 'ngx-socket-io/src/socket-io.service';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    private socket!: WrappedSocket;
    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            // Socket initialization logic for the browser
            const config: SocketIoConfig = { url: 'http://localhost:8080', options: { autoConnect: false } };
            this.socket = new Socket(config);
        }
    }

    public handleConnectionEvents(data: any) {
        if (!this.socket) {
            return;
        }

        this.socket.ioSocket.io.opts.query = data;
        // this.socket.ioSocket.io.opts.path = `http://127.0.0.1:8080/socket.io`;
        this.socket.connect();

        // Listen for the 'connect' event to run code once connection is done
        this.socket.on('connect', () => {
            console.log('Connected to Socket.IO server');
        });

        this.socket.on('authenticationSuccess', (data: any) => {
            console.log('Authentication successful:', data.message);
        });

        // Listen for the 'error' event to log an error message
        this.socket.on('error', (err: any) => {
            console.error('Error during Socket.IO connection:', err);
        })

        this.socket.on('disconnect', () => {
            console.log('Disconnected from Socket.IO server');
        });

        // this.onEvent("").subscribe({

        //     next: (dr: DownloadRequest) => {
        //     },
        //     error: (err: any) => {

        //         console.error('Error during Socket.IO connection:', err);
        //     },

        //     complete: () => {

        //         console.log("completed")
        //     }
        // })

    }

    // Method to send a question to the server
    askQuestion(question: string) {
        this.socket.emit('askQuestion', question);
    }

    // Method to listen for answers from the server
    getAnswer(): Observable<any> {
        if (!this.socket) return of(null);
        return this.socket.fromEvent('answer');
    }

    // Method to listen for errors from the server
    getError(): Observable<any> {
        if (!this.socket) return of(null);
        return this.socket.fromEvent('error');
    }
}
