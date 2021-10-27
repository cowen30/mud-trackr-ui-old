import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../services/auth/auth.service';

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

	loginFailed: boolean = false;
	errorMessage: string = '';

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private router: Router,
		private spinner: NgxSpinnerService
	) { }

	ngOnInit(): void {
	}

	login(): void {
		this.spinner.show();
		this.authService.login(this.loginForm.value).subscribe(() => {
			this.router.navigate(['/profile']);
		}, (error) => {
			this.loginFailed = true;
			this.errorMessage = error.error.message;
		}).add(() => {
			this.spinner.hide();
		});
	}

}
