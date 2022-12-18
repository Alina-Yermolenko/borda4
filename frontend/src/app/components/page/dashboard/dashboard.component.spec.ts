import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let testBoard = {
    "_id": "636232bf46f56f233e739ec1",
    "userId": "635922585ed5b8d761d27e7c",
    "created_by": "635922585ed5b8d761d27e7c",
    "title": "Sasha Top", "description": "or not",
    "createdDate": "1667379903875",
    "todo": [],
    "done": [
      {
        "title": "dfggdf",
        "createdDate": "1667400639067",
        "boardId": "636232bf46f56f233e739ec1",
        "comments": ["hi", "hello", ""],
        "_id": "636283bf159e5da74ff1dcd9"
      },
      {
        "title": "gfggggg",
        "createdDate": "1667400686649",
        "boardId": "636232bf46f56f233e739ec1",
        "comments": [],
        "_id": "636283ee159e5da74ff1de02"
      },
    ],
    "inProgress": [],
    "archive": [{
      "title": "now",
      "createdDate": "1667379917902",
      "boardId": "636232bf46f56f233e739ec1",
      "comments": ["jeje"],
      "_id": { "$oid": "636232cd46f56f233e739ee4" }
    },
    {
      "title": "bow",
      "createdDate": "1667379930967",
      "boardId": "636232bf46f56f233e739ec1",
      "comments": [],
      "_id": "636232da46f56f233e739f19"
    },
    ],
    "__v": "220"
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show modal', () => {
    const callFunc = component.createBoard(true);
    expect(callFunc).toBeTruthy();
  });

  it('should not show modal', () => {
    const callFunc = component.createBoard(false);
    expect(callFunc).toBeFalse();
  });

  it('function addBoardResponse should be resolved successfully', () => {
    const callFunc = component.addBoardResponse(200, testBoard);
    expect(callFunc).toBe('Success');
  });

  it('function addBoardResponse should be not resolved', () => {
    const callFunc = component.addBoardResponse(400, testBoard);
    expect(callFunc).toBe('An error occured');
  });

});
