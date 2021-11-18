import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
	selector: 'app-headband',
	templateUrl: './headband.component.html',
	styleUrls: ['./headband.component.scss']
})
export class HeadbandComponent implements OnInit {

	headbandText: string = '';
	headbandClass: string = '';
	fontColor: string = 'black';

	private _legionnaireCount = new BehaviorSubject<number>(1);

	@Input('legionnaireCount') set legionnaireCount(value: number) {
		this._legionnaireCount.next(value);
	}

	get legionnaireCount() {
		return this._legionnaireCount.getValue();
	}

	constructor() { }

	ngOnInit(): void {
		this._legionnaireCount.subscribe((count: number) => {
			if (count == 1) {
				this.headbandClass = 'headband-1x';
				this.headbandText = '1x';
			} else if (count == 2) {
				this.headbandClass = 'headband-2x';
				this.headbandText = '2x';
			} else if (count == 3) {
				this.headbandClass = 'headband-3x';
				this.headbandText = '3x';
			} else if (count >= 4 && count <= 6) {
				this.headbandClass = 'headband-4-6x';
				this.headbandText = '4-6x';
			} else if (count >= 7 && count <= 9) {
				this.headbandClass = 'headband-7-9x';
				this.headbandText = '7-9x';
			} else if (count >= 10 && count <= 24) {
				this.headbandClass = 'headband-10x';
				this.headbandText = '10x';
				this.fontColor = 'white';
			} else if (count >= 25 && count <= 49) {
				this.headbandClass = 'headband-25x';
				this.headbandText = '25x';
			}
		});
	}

}
