import { Injectable } from '@angular/core';
import { environment } from '../../metadata/environment';

@Injectable({
    providedIn: 'root',
})
export class ApiEndpointsService {
    private readonly baseUrl = environment.apiBaseUrl;
    private readonly socketUrl = environment.socketUrl;

    getEndpoint(path: string): string {
        return `${this.baseUrl}${path}`;
    }

    getSocketEndpoint(path: string): string {
        return `${this.socketUrl}${path}`;
    }

    get user() {
        return environment.endpoints.user;
    }

    get auth() {
        return environment.endpoints.auth;
    }

    get document() {
        return environment.endpoints.document;
    }

    get upload() {
        return environment.endpoints.upload;
    }
}
