import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddonDetailComponent } from './modal-addon-detail.component';

describe('ModalAddonDetailComponent', () => {
  let component: ModalAddonDetailComponent;
  let fixture: ComponentFixture<ModalAddonDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddonDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
