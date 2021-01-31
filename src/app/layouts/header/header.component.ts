import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/'],
      },
      {
        label: 'Register',
        icon: 'pi pi-user-plus',
        routerLink: ['/register']
      },
      {
        label: 'LogIn',
        icon: 'pi pi-user',
        routerLink: ['/login'],
      }
    ]
   }
}
