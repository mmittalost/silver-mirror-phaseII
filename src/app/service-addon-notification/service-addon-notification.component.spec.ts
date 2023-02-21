import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAddonNotificationComponent } from './service-addon-notification.component';

describe('ServiceAddonNotificationComponent', () => {
  let component: ServiceAddonNotificationComponent;
  let fixture: ComponentFixture<ServiceAddonNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceAddonNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceAddonNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
