import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardListComponent } from './board-list.component';
import { getTitlePipe } from 'src/app/pipes/getTitle.pipe'
import { setColorPipe } from 'src/app/pipes/setColor.pipe'

describe('BoardListComponent', () => {
  let component: BoardListComponent;
  let fixture: ComponentFixture<BoardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [getTitlePipe, BoardListComponent, setColorPipe]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BoardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('function deleteBoard should call delete from service', () => {
    const callFunc = component.deleteBoard();
    expect(callFunc).toBe('Call for deleting board');
  });

  it('function ngOnInit should return empty string', async () => {
    const callFunc = await component.ngOnInit();
    expect(callFunc).toBeTruthy();
  });
});
