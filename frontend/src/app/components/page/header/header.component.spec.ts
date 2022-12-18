import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('function sortBoards should sort boards by asc order', () => {
    const callFunc = component.sortBoards();
    if(component.order=== 'asc'){
      expect(callFunc).toBe('Sorted by asc order');
    }
  });

  it('function sortTasks should sort boards by asc order', () => {
    const callFunc = component.sortTasks();
    if(component.order=== 'asc'){
      expect(callFunc).toBe('Sorted by asc order');
    }
  });

  it('function changeOrder should sort boards by order', () => {
    const callFunc = component.changeOrder('desc');
      expect(callFunc).toBe('Order changed to desc');
  });

  it('function changeOrder should sort boards by order', () => {
    const callFunc = component.changeOrder('desc');
      expect(callFunc).toBe('Order changed to desc');
  });

  it('function changeOrder should not sort boards by not existing order', () => {
    const callFunc = component.changeOrder('food');
      expect(callFunc).toBe("Order food doesn't exist");
  });

  it('function filterItems should filter tasks', () => {
     const callFunc = component.filterItems();
      expect(callFunc).toBeTruthy();
  });



});
