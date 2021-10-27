import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ValidationsHelper } from '../helpers/validations.helper';
import { AuthService } from '../services/auth/auth.service';

@Component({
	selector: 'app-create-account',
	templateUrl: './create-account.component.html',
	styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

	createAccountForm: FormGroup = this.formBuilder.group({
		firstName: [null, Validators.required],
		lastName: [null, Validators.required],
		email: [null, [Validators.required, Validators.email]],
		password: [null, [
			Validators.required,
			Validators.minLength(8),
			ValidationsHelper.validatePasswordUppercaseCharacters(),
			ValidationsHelper.validatePasswordSpecialCharacters()
		]],
		passwordConfirmation: [null, Validators.required]
	}, { validators: ValidationsHelper.validatePasswordMatchesConfirmation });

	get password() { return this.createAccountForm.get('password'); }

	clientError: string = '';

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private router: Router,
		private spinner: NgxSpinnerService
	) { }

	ngOnInit(): void {
	}

	createAccount(): void {
		this.spinner.show();
		this.authService.createAccount(this.createAccountForm.value).subscribe((result) => {
			this.spinner.hide();
			this.router.navigate(['/profile']);
		}, (error) => {
			if (error.status === 400) {
				this.clientError = error.error.message;
			}
			this.spinner.hide();
		});
	}

}
