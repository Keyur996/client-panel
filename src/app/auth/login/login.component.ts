import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('logInForm') form: NgForm;
  user: User = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService,
    private message: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe( (loggedIn) => {
      this.router.navigate(['/'], { relativeTo: this.route })
    });
  }

  onSubmit(){
    if(this.form.valid){
      // console.log(this.user);
      this.authService.logIn(this.user).then( (res) => {
        this.message.add({ severity: 'success', detail: 'LogIn Successful', icon: 'pi pi-user', life: 3000 });
        this.router.navigate(['/'], { relativeTo: this.route });
      }).catch( err => {
        this.message.add({ severity: 'error', detail: err, icon: 'pi pi-user', life: 3000 });
      });
    }
  }
}
