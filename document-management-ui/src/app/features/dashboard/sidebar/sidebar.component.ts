import { Component, OnInit, ViewChild, computed, effect } from '@angular/core';
import { SidebarModule, Sidebar } from 'primeng/sidebar';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, SidebarModule, RouterModule, ButtonModule, RippleModule, AvatarModule, StyleClassModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  sidebarVisible: boolean = false;
  activeButton: string = 'upload'; // Default active button
  name: string = '';

  constructor(private userService: UserService) {
    effect(() => {
      const currentUser = this.userService._currentUser();
      this.name = currentUser?.name || '';
    });
  }

  ngOnInit(): void {
  }

  closeCallback(e: any): void {
    this.sidebarRef.close(e);
  }

  setActive(button: string): void {
    this.activeButton = button;
  }

  logout() {
    this.userService.logout();
  }
}
