import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalServiceDetailComponent } from './modal-service-detail.component';

describe('ModalServiceDetailComponent', () => {
  let component: ModalServiceDetailComponent;
  let fixture: ComponentFixture<ModalServiceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalServiceDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalServiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
