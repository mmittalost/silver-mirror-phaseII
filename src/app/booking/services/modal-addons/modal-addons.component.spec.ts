import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddonsComponent } from './modal-addons.component';

describe('ModalAddonsComponent', () => {
  let component: ModalAddonsComponent;
  let fixture: ComponentFixture<ModalAddonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
