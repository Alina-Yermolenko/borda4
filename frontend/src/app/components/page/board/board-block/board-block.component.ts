import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-board-block',
  templateUrl: './board-block.component.html',
  styleUrls: ['./board-block.component.scss']
})

export class BoardBlockComponent implements OnInit {
  @Input() nameTitle: string = '';
  @Input() nameId: string = '';
  @Input() singleBoard: any;
  @Input() doneList: any;
  @Input() cdkDropListData: any;

  id: number = 0;
  listColor: string = '';
  showItemInput: boolean[] = [false];
  showItemInputArray: boolean[] = [];
  showSpinner: boolean = true;

  constructor(private router: Router,
    public service: DataService
  ) {
    this.service.spinnerEvent.subscribe(() => {
      this.showSpinner = false;
    })
  }

  async ngOnInit() {
    await this.service.getBoards();
    await this.service.getItems();
  }

  checkIfDone() {
    if (this.nameId === 'done') {
      return true;
    }
    else {
      return false;
    }
  }

  changeColor(event: any) {
    this.listColor = event.target.value;
    return this.listColor;
  }

  createItem() {
    this.cdkDropListData.push({ id: this.cdkDropListData.length });
    this.cdkDropListData.map((one: any, index: number, row: []) => {
      this.showItemInputArray.push(false);

      if (index + 1 === row.length) {
        this.showItemInputArray.pop();
        this.showItemInputArray.push(true);
        this.showItemInputArray.map((value: boolean) => {
          one.showItemInput = value;
        })
      }
    })

    this.showItemInput = this.showItemInputArray

    this.showItemInputArray = [];
  }

}
