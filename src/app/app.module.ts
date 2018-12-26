import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule , FormsModule  }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NavComponent } from './nav/nav.component';
import { ContactComponent } from './contact/contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';

import { HttpAuthInterceptor } from './services/http-auth-interceptor';
import { JwtHelper } from './helpers/jwthelpers';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NavComponent,
    ContactComponent,
    LoginComponent
  ],
  imports: [
	BrowserModule,
	HttpClientModule,
    AppRoutingModule,
	BrowserAnimationsModule,
	FormsModule,
	ReactiveFormsModule
  ],
  providers: [
	{
		provide: HTTP_INTERCEPTORS,
		useClass: HttpAuthInterceptor,
		multi: true
	},
	JwtHelper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
