import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginForm : FormGroup;

	constructor(
		private fb: FormBuilder, 
		private _router: Router, 
		private auth: AuthService
	) 
	{
		
		this.loginForm = fb.group({
			username: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required]
		});
	}

	ngOnInit() {
	}

	login() {

		const modal = this.loginForm.value;
		console.log(modal);
		console.log('is Valid => ' + this.loginForm.valid);
		if (this.loginForm.valid) {
			this.auth.login(modal.username, modal.password)
			.subscribe((res : any) => {
				console.log(res);
				localStorage.setItem('token', res.accessToken);
				localStorage.setItem('refreshToken', res.refreshToken);
				this._router.navigate(['/home']);
			}, error => {
				console.log(error);
			})

		}
	
	}
}
