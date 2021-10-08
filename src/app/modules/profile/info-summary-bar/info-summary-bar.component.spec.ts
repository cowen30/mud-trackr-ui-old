import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSummaryBarComponent } from './info-summary-bar.component';

describe('InfoSummaryBarComponent', () => {
  let component: InfoSummaryBarComponent;
  let fixture: ComponentFixture<InfoSummaryBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoSummaryBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoSummaryBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
