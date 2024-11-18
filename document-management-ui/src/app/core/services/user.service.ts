import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { LoginUser, User } from '../../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private httpService: HttpService) { }

    createUser(url: string, user: User): Observable<User> {
        return this.httpService.post<User>(url, user);
    }

    loginUser(url: string, user: LoginUser): Observable<User> {
        return this.httpService.post<User>(url, user);
    }
}
