import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-routing.module';

import { ProfileComponent } from './profile.component';
import { DetailsComponent } from './details/details.component';
import { EventsComponent } from './events/events.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfoSummaryBarComponent } from './info-summary-bar/info-summary-bar.component';

@NgModule({
	declarations: [
		ProfileComponent,
		DetailsComponent,
		EventsComponent,
  InfoSummaryBarComponent
	],
	imports: [
		CommonModule,
		ProfileRoutingModule,
		FormsModule,
		ReactiveFormsModule,
	],
	providers: [],
	bootstrap: [ProfileComponent]
})
export class ProfileModule { }
