import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestTabsComponent } from './guest-tabs.component';

describe('GuestTabsComponent', () => {
  let component: GuestTabsComponent;
  let fixture: ComponentFixture<GuestTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
