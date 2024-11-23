import { Component, effect, Input } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { DOC_CONFIGS, USER_CONFIGS } from '../../../metadata/entity-config';
import { UserModel } from '../../../models/user.model';
import { NoDataComponent } from '../../../shared/components/no-data/no-data.component';
import { CustomTableComponent } from '../../../shared/custom-table/custom-table.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CustomTableComponent, NoDataComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  config: any = USER_CONFIGS;
  entityType!:string;
  data: any[] = [];

  constructor(private userService:UserService) {
    effect(() => {
      const users: any[] = this.userService._allUsers();
      this.data = users;
    });
   }

  ngOnInit() {
    this.userService.getUsers();
    this.entityType = this.config.type;
  }

  deleteUser(user:any){
    this.userService.deleteUser(user.id)
  }

  // delete multiple users
  deleteUsers(users: any) {
    const userIds = users.map((user: any) => user.id);
    this.userService.deleteUsers(userIds);
  }

  updateUser(user:any){
    this.userService.updateUser(user)
  }
}
