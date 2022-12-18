import { TestBed } from '@angular/core/testing';

import { ModalService } from './modal.service';

describe('ModalService', () => {
  let service: ModalService;

  let testItem = {
    "title": "dfggdf",
    "createdDate": "1667400639067",
    "boardId": "636232bf46f56f233e739ec1",
    "comments": ["hey", "hi", ""],
    "_id": "636283bf159e5da74ff1dcd9"
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Function showModalBoard should return true', () => {
    const callFunc = service.showModalBoard();
    
    expect(callFunc).toBeTruthy();
  });

  it('Function setEditData should return item', () => {
    const callFunc = service.setEditData(testItem);
    expect(callFunc).toBe(testItem);
  });

});
