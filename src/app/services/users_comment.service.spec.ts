import { TestBed } from '@angular/core/testing';

import { UsersCommentService } from './users_comment.service';

describe('UsersCommentService', () => {
  let service: UsersCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
