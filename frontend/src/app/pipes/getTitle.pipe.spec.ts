import { getTitlePipe } from './getTitle.pipe';

let testItem = {
    "title": "work",
    "createdDate": "1667400639067",
    "boardId": "636232bf46f56f233e739ec1",
    "comments": ["hi", "ho", ""],
    "_id": "636283bf159e5da74ff1dcd9"
  };

describe('getTitlePipe', () => {
    const pipe = new getTitlePipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms "value" to "value.title"', () => {
    expect(pipe.transform(testItem)).toBe(testItem.title);
  });
});
