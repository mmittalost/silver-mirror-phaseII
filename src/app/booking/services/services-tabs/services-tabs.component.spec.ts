import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesTabsComponent } from './services-tabs.component';

describe('ServicesTabsComponent', () => {
  let component: ServicesTabsComponent;
  let fixture: ComponentFixture<ServicesTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
