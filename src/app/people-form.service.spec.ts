import { TestBed } from '@angular/core/testing';

import { PeopleFormService } from './people-form.service';

describe('PeopleFormService', () => {
  let service: PeopleFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeopleFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
