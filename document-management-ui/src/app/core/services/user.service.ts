import { Injectable, signal } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { CurrentUser, LoginUser, User, UserModel } from '../../models/user.model';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public _currentUser = signal<CurrentUser | null>(null);
    public _allUsers = signal<UserModel[]>([]);

    constructor(private httpService: HttpService, private messageService: MessageService) { }

    createUser(url: string, user: User): Observable<User> {
        return this.httpService.post<User>(url, user);
    }

    getProfile(url: string): void {
        this.httpService.get<User>(url).subscribe({
            next: (res: any) => {
                this._currentUser.set({
                    name: res.name,
                    roles: res.roles
                } as CurrentUser);
            },
            error: (err) => {
                console.error(err);
            }
        });
    }

    getUsers(): void {
        const url = "http://localhost:3000/user/"
        this.httpService.get<UserModel[]>(url).subscribe({
            next: (res: UserModel[]) => {
                // Map the response to UserModel instances
                const users = res.map(user => new UserModel(
                    user.id,
                    user.username,
                    user.name,
                    user.email,
                    user.roles,
                    user.createdAt
                ));
                this._allUsers.set(users);
            },
            error: (err) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
            }
        });
    }

    loginUser(url: string, user: LoginUser): Observable<User> {
        return this.httpService.post<User>(url, user);
    }

    deleteUser(userId: string) {
        const url = "http://localhost:3000/user/" + userId
        this.httpService.delete<UserModel[]>(url).subscribe({
            next: (res: any) => {
                console.log(res);
            },
            error: (err) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
            }
        });
    }

    updateUser(item: UserModel) {
        const url = `http://localhost:3000/user/${item.id}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        this.httpService.put(url, item, headers).subscribe({
            next: (res: any) => {
                console.log(res);
            },
            error: (err) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
            }
        });
    }

    logout(): void {
        localStorage.removeItem('accessToken');
        this._currentUser.set(null);
        console.log('User logged out successfully');
    }
}
