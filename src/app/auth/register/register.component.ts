import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm') form: NgForm;

  user: User = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService,
    private message: MessageService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.authService.userEmail.subscribe((email) => {
      this.router.navigate(['/'],  { relativeTo: this.route })
    })
  }

  onSubmit() {
    if(this.form.valid){
      console.log(this.user);
      console.log(this.form.value);
      this.authService.register(this.user).then( (res) => {
        console.log(res);
        this.router.navigate(['/'], { relativeTo: this.route });
        this.message.add({ severity: 'success', detail: 'LogIn Successful', icon: 'pi pi-user'});
        setTimeout( () =>  this.message.clear(), 3000);
      }).catch( err => {
        this.message.add({ severity: 'error', detail: err.message , summary: "Error:" ,icon: 'pi pi-user'});
        setTimeout( () =>  this.message.clear(), 3000);
      });
    } else {
      this.message.add({ severity: 'error', detail: 'Please Enter Valid Data' , summary: "*" });
      setTimeout( () =>  this.message.clear(), 3000);
    }
  }

}
