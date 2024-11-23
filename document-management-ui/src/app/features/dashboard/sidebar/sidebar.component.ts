import { Component, OnInit, ViewChild, computed, effect } from '@angular/core';
import { SidebarModule, Sidebar } from 'primeng/sidebar';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { filter } from 'rxjs';

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
  roles!: string[] | undefined;

  constructor(private userService: UserService, private router: Router) {
    effect(() => {
      const currentUser = this.userService._currentUser();
      this.name = currentUser?.name || '';
      this.roles = currentUser?.roles;
    });

    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url.includes('upload')) {
        this.setActive('upload');
      } else if (event.url.includes('documents')) {
        this.setActive('documents');
      } else if (event.url.includes('settings')) {
        this.setActive('settings');
      }
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
