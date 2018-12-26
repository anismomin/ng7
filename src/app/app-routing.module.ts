import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './guards/auth-guard.service';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: '',  redirectTo: 'home', pathMatch: 'full'},
	{ path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
	{ path: 'about', component: AboutComponent , canActivate: [AuthGuard]},
	{ path: 'contact', component: ContactComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




