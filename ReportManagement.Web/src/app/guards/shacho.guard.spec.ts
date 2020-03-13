import { TestBed, async, inject } from '@angular/core/testing';

import { ShachoGuard } from './shacho.guard';

describe('ShachoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShachoGuard]
    });
  });

  it('should ...', inject([ShachoGuard], (guard: ShachoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
