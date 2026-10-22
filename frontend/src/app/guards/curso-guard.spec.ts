import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { cursoGuard } from './curso-guard';

describe('cursoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => cursoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
