import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalIsAddonAddedComponent } from './modal-is-addon-added.component';

describe('ModalIsAddonAddedComponent', () => {
  let component: ModalIsAddonAddedComponent;
  let fixture: ComponentFixture<ModalIsAddonAddedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalIsAddonAddedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalIsAddonAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
