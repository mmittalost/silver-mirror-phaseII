import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhosComingComponent } from './whos-coming.component';

describe('WhosComingComponent', () => {
  let component: WhosComingComponent;
  let fixture: ComponentFixture<WhosComingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhosComingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhosComingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
