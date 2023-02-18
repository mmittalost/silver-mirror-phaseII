import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentTileComponent } from './appointment-tile.component';

describe('AppointmentTileComponent', () => {
  let component: AppointmentTileComponent;
  let fixture: ComponentFixture<AppointmentTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
