import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HeadbandComponent } from './headband/headband.component';

@NgModule({
	declarations: [
		LoadingSpinnerComponent,
		HeadbandComponent
	],
	imports: [
		CommonModule,
		NgxSpinnerModule
	],
	exports: [
		LoadingSpinnerComponent,
		HeadbandComponent
	]
})
export class SharedModule { }
