import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-profile-info-summary-bar',
	templateUrl: './info-summary-bar.component.html',
	styleUrls: ['./info-summary-bar.component.scss']
})
export class InfoSummaryBarComponent implements OnInit {

	@Input('tmLegionnaireCount') tmLegionnaireCount: number = 0;

	constructor() { }

	ngOnInit(): void {
	}

}
