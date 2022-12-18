import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('function changeListColor should assign new color', async () => {
    const callFunc = await component.changeListColor('#ffffff');
    expect(callFunc).toBe('#ffffff');
  });
});
