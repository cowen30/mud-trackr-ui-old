import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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
		email: [null, Validators.required],
		password: [null, [
			Validators.required,
			Validators.minLength(8),
			this.validatePasswordUppercaseCharacters(),
			this.validatePasswordSpecialCharacters()
		]],
		passwordConfirmation: [null, Validators.required]
	}, { validators: this.validatePasswordMatchesConfirmation });

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

	validatePasswordUppercaseCharacters(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const uppercaseCharacters = /[A-Z]/.test(control.value);
			return uppercaseCharacters ? null : { uppercaseCharacters: { value: control.value } };
		};
	}

	validatePasswordSpecialCharacters(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const specialCharacters = /[!@#$%^&*]/.test(control.value);
			return specialCharacters ? null : { specialCharacters: { value: control.value } };
		};
	}

	validatePasswordMatchesConfirmation(control: AbstractControl): ValidationErrors | null {
		const password = control.get('password');
		const passwordConfirmation = control.get('passwordConfirmation');
		const matchesConfirmation = password?.value === passwordConfirmation?.value;
		return matchesConfirmation ? null : { matchesConfirmation: true };
	}

}
