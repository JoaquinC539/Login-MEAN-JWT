import { TestBed } from '@angular/core/testing';

import { DashGuardGuard } from './dash-guard.guard';

describe('DashGuardGuard', () => {
  let guard: DashGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DashGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
