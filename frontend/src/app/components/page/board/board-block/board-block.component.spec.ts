import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardBlockComponent } from './board-block.component';

describe('BoardBlockComponent', () => {
  let component: BoardBlockComponent;
  let fixture: ComponentFixture<BoardBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardBlockComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BoardBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('function checkIfDone should return false', () => {
    const callFunc = component.checkIfDone();
    expect(callFunc).toBeFalse();
  });

  it('function changeColor should return selected color', () => {
    const event = { target: { value: '0000000' } }
    const callFunc = component.changeColor(event);
    expect(callFunc).toBe('0000000');
  });

});
