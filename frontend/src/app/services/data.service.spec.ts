import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let testUser = {
    _id: '635922585ed5b8d761d27e7c',
    email: "alina1999",
    password: "$2a$10$Iely3b7mlVYgt8NoQ6i1ZeVT8Ko4VHO4HvPi6e2Bwf41vtg5xTOdu",
    createdDate: "2022-10-26T10:10:03.103Z",
    __v: 0
  }

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
        "comments": ["he", "ping"],
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

  let testItem = {
    "title": "first item",
    "createdDate": "1667400639067",
    "boardId": "636232bf46f56f233e739ec1",
    "comments": ["do it", "hmmm", ""],
    "_id": "636283bf159e5da74ff1dcd9"
  };

  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('function getBoardsResponse should be resolved unsuccessfully', async () => {
    const callFunc = await service.getBoardsResponse(400, [testBoard]);
    expect(callFunc).toEqual('No boards');
  });

  it('function getBoardsResponse should give server error', async () => {
    const callFunc = await service.getBoardsResponse(500, []);
    expect(callFunc).toEqual('Server error');
  });

  it('function editBoardResponse should be resolved successfully', async () => {
    const callFunc = await service.editBoardResponse(200, 'hi');
    expect(callFunc).toEqual('Board title changed');
  });

  it('function editBoardResponse should be resolved unsuccessfully', async () => {
    const callFunc = await service.editBoardResponse(400, 'bye');
    expect(callFunc).toEqual('No such board');
  });

  it('function editBoardResponse should be with input', async () => {
    const callFunc = await service.editBoardResponse(500, '');
    expect(callFunc).toEqual('Please, provide input');
  });

  it('function deleteBoardResponse should be resolved unsuccessfully', async () => {
    const callFunc = await service.deleteBoardResponse(200, testItem);
    expect(callFunc).toEqual('Board deleted succesfully');
  });

  it('function deleteBoardResponse should be with input', async () => {
    const callFunc = await service.deleteBoardResponse(888, testItem);
    expect(callFunc).toEqual('Server error');
  });

  it('function getFilteredBoards should be resolved successfully without input', async () => {
    const callFunc = await service.getFilteredBoards('');
    expect(service.renderBoards === service.boards).toBeTruthy();
  });

  it('function createOneTask should not be resolved without status', async () => {
    const callFunc = await service.createOneTask(testBoard, '', 'first task');
    expect(callFunc).toBe('Status of task not defined');
  });

  it('function createOneTask should not be created', async () => {
    const callFunc = await service.createOneTask(testBoard, 'sounds', 'miew');
    expect(callFunc).toBe("NameId doesn't exist");
  });

  it('function createOneTaskResponse should be resolved', async () => {
    const callFunc = await service.createOneTaskResponse(200, testBoard, 'todo');
    expect(callFunc).toBe('Task created succesfully');
  });

  it('function createOneTaskResponse should not be resolved', async () => {
    const callFunc = await service.createOneTaskResponse(400, testBoard, 'todo');
    expect(callFunc).toBe('Task not created');
  });

  it('function getItemsResponse should be resolved', async () => {
    const callFunc = await service.getItemsResponse(200, testBoard);
    expect(callFunc).toBe('Tasks shown');
  });

  it('function getItemsResponse should not be resolved', async () => {
    const callFunc = await service.getItemsResponse(500, testBoard);
    expect(callFunc).toBe('No tasks');
  });

  it('function updateListResponse should be resolved', async () => {
    const callFunc = await service.updateListResponse(200);
    expect(callFunc).toBe('List updated successfully');
  });

  it('function updateListResponse should not be resolved', async () => {
    const callFunc = await service.updateListResponse(500);
    expect(callFunc).toBe('List not updated');
  });

  it('function editOneTask should not be resolved without status and title', async () => {
    const callFunc = await service.editOneTask(testBoard, testItem, '', '')
    expect(callFunc).toBe('Status not defined');
  });

  it('function editOneTask should not be resolved if status is empty', async () => {
    const callFunc = await service.editOneTask(testBoard, testItem, '', 'newTitle')
    expect(callFunc).toBe('Status not defined');
  });

  it('function editOneTask should not be resolved if title is empty', async () => {
    const callFunc = await service.editOneTask(testBoard, testItem, 'done', '')
    expect(callFunc).toBe('Please, provide a title');
  });

  it('function editOneTaskResponse should not be resolved', async () => {
    const callFunc = await service.editOneTaskResponse(404)
    expect(callFunc).toBe('Task not edited');
  });

  it('function editOneTaskResponse should be successfully edited', async () => {
    const callFunc = await service.editOneTaskResponse(200)
    expect(callFunc).toBe('Task edited succesfully');
  });

  it('function deleteOneTaskResponse should be deleted successfully', async () => {
    const callFunc = await service.deleteOneTaskResponse(200)
    expect(callFunc).toBe('Task deleted successfully');
  });

  it('function deleteOneTaskResponse should not be deleted', async () => {
    const callFunc = await service.deleteOneTaskResponse(903)
    expect(callFunc).toBe('Task not deleted');
  });
});
