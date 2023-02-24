import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileServicesTabsComponent } from './mobile-services-tabs.component';

describe('MobileServicesTabsComponent', () => {
  let component: MobileServicesTabsComponent;
  let fixture: ComponentFixture<MobileServicesTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileServicesTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileServicesTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
