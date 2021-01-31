import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotFoundComponent } from './layouts/not-found/not-found.component';
import { AddClientComponent } from './pages/add-client/add-client.component';
import { EditClientComponent } from './pages/edit-client/edit-client.component';
import { ClientDetailComponent } from './pages/client-detail/client-detail.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path:'login', component: LoginComponent },
  { path:'register', component: RegisterComponent },
  { path:'add-client', component: AddClientComponent},
  { path:'edit-client/:id', component: EditClientComponent },
  { path:'client/:id', component: ClientDetailComponent },
  { path:'**', component: NotFoundComponent },
]

@NgModule({
  exports: [
    RouterModule,
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [],
})
export class AppRouterModule { }
