import { TestBed } from '@angular/core/testing';

import { SilverMirrorService } from './silver-mirror.service';

describe('SilverMirrorService', () => {
  let service: SilverMirrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SilverMirrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
