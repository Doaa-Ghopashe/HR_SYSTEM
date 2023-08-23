import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loggedoutGuardGuard } from './loggedout-guard.guard';

describe('loggedoutGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loggedoutGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
