import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDetailModelComponent } from './service-detail-model.component';

describe('ServiceDetailModelComponent', () => {
  let component: ServiceDetailModelComponent;
  let fixture: ComponentFixture<ServiceDetailModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceDetailModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceDetailModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
