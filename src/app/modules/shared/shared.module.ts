import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
	declarations: [
		LoadingSpinnerComponent
	],
	imports: [
		CommonModule,
		NgxSpinnerModule
	],
	exports: [
		LoadingSpinnerComponent
	]
})
export class SharedModule { }
