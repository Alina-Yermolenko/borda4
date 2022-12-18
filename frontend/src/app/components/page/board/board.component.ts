import { Component, OnInit } from '@angular/core';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {
  boards: any;
  listColor: string = '';
  singleBoard: { todo: [], inProgress: [], done: [] } = { todo: [], inProgress: [], done: [] };

  constructor(
    public service: DataService,
  ) {  }

  async ngOnInit(): Promise<void> {
    this.boards = await this.service.getBoards();
    this.singleBoard = this.service.getSingle();
  }

  changeListColor(color: string) {
    return this.listColor = color
  }

  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data || [],
        event.previousIndex,
        event.currentIndex,
      );
    }

    this.service.updateList(this.singleBoard)
  }
}
