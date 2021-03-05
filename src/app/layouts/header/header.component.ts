import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }
    loggedIn: boolean = false;

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
      }
    ]

    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.router.navigate(['/'], { relativeTo: this.route });
        this.authService.loggedIn.next(true);
        this.loggedIn = true;
      }
    });

   }

   logOut() {
    this.authService.logOut();
    this.router.navigate(['login'], { relativeTo: this.route });
   }
}
