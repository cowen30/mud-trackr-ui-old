import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class ValidationsHelper {

	static validatePasswordUppercaseCharacters(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const uppercaseCharacters = /[A-Z]/.test(control.value);
			return uppercaseCharacters ? null : { uppercaseCharacters: { value: control.value } };
		};
	}

	static validatePasswordSpecialCharacters(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const specialCharacters = /[!@#$%^&*]/.test(control.value);
			return specialCharacters ? null : { specialCharacters: { value: control.value } };
		};
	}

	static validatePasswordMatchesConfirmation(control: AbstractControl): ValidationErrors | null {
		const password = control.get('password');
		const passwordConfirmation = control.get('passwordConfirmation');
		const matchesConfirmation = password?.value === passwordConfirmation?.value;
		return matchesConfirmation ? null : { matchesConfirmation: true };
	}
	
}
