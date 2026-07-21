import { TestBed } from '@angular/core/testing';

import { Chaservice } from './chaservice';

describe('Chaservice', () => {
  let service: Chaservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Chaservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
