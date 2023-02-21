import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipProductsComponent } from './membership-products.component';

describe('MembershipProductsComponent', () => {
  let component: MembershipProductsComponent;
  let fixture: ComponentFixture<MembershipProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
