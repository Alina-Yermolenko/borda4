import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskButtonsComponent } from './task-buttons.component';

describe('TaskButtonsComponent', () => {
  let component: TaskButtonsComponent;
  let fixture: ComponentFixture<TaskButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskButtonsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaskButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('function editTask should set status on task', () => {
    const callFunc = component.editTask(true);
    expect(callFunc).toBeTrue();
  });

  it('function showButtons should show buttons', () => {
    const callFunc = component.showButtons();
    expect(callFunc).toBeTrue();
  });

  it('function showCommentsFunc display comments', () => {
    const callFunc = component.showCommentsFunc();
    expect(callFunc).toBeTrue();
  });

  it('function createComment should create comment', () => {
    component.comment = 'morning';
    component.item = {comments : []};
    component.list = [];
    const callFunc = component.createComment();
    expect(callFunc).toBe('Comment created');
  });

  it('function createComment should not create comment', () => {
    const callFunc = component.createComment();
    expect(callFunc).toBe('Comment must have something');
  });

  it('function deleteComment should delete comment', () => {
    component.item = {comments : []};
    component.list = [];
    const callFunc = component.deleteComment();
    expect(callFunc).toBe('Comment deleted');
  });
});
