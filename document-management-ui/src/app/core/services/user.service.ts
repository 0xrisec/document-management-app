import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { CurrentUser, LoginUser, User, UserModel } from '../../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public _currentUser = signal<CurrentUser | null>(null);
    public _allUsers = signal<UserModel[]>([]);

    constructor(private httpService: HttpService) { }

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
                console.error(err);
            }
        });
    }

    loginUser(url: string, user: LoginUser): Observable<User> {
        return this.httpService.post<User>(url, user);
    }

    deleteUser(userId:string){
        const url = "http://localhost:3000/user/" + userId
        this.httpService.delete<UserModel[]>(url).subscribe({
            next: (res: any) => {
                console.log(res);
            },
            error: (err) => {
                console.error(err);
            }
        });
    }
}
