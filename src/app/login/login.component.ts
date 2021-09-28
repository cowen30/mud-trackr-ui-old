import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { TokenStorageService } from '../services/token-storage/token-storage.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup = this.formBuilder.group({
		email: '',
		password: ''
	});

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService
	) { }

	ngOnInit(): void {
	}

	login(): void {
		this.authService.login(this.loginForm.value);
	}

}
