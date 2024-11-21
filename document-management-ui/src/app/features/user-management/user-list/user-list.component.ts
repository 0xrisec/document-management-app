import { Component, effect, Input } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { DOC_CONFIGS, USER_CONFIGS } from '../../../metadata/entity-config';
import { UserModel } from '../../../models/user.model';
import { CustomTableComponent } from '../../../shared/custom-table/custom-table.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CustomTableComponent],
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

  deleteItem(user:any){
    this.userService.deleteUser(user.id)
  }
}
