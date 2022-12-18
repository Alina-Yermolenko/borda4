import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Board, Item } from 'src/app/interfaces/interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-task-buttons',
  templateUrl: './task-buttons.component.html',
  styleUrls: ['./task-buttons.component.scss']
})
export class TaskButtonsComponent implements OnInit {
  @Input() toggle: boolean = true;
  @Input() check!: boolean;
  @Input() singleBoard!: Board;
  @Input() item: any;
  @Input() nameId: string = '';
  @Input() list: any;
  @Input() showItemInput: boolean = false;
  @Output() showItemInputChange = new EventEmitter<boolean>();

  show: boolean = false;
  showComments: boolean = false;
  comment: string = '';

  constructor(
    private service: DataService,
  ) {
  }

  ngOnInit(): void { }

  editTask(status: boolean) {
    this.showItemInput = status;
    this.showItemInputChange.emit(status);
    return status;
  }

  showButtons() {
    return this.show = !this.show;
  }

  showCommentsFunc() {
    return this.showComments = !this.showComments;
  }

  deleteTask() {
    this.list.splice(this.list.indexOf(this.item), 1);
    this.service.deleteOneTask(this.nameId, this.item);
  }

  archiveTask() {
    this.singleBoard.archive.push(this.item)
    this.list.splice(this.list.indexOf(this.item), 1);
    this.service.updateList(this.singleBoard);
  }

  createComment() {
    if (this.comment.length > 0) {
      this.item.comments.push(this.comment)
      this.service.updateList(this.singleBoard)
      return 'Comment created'
    }
    else {
      return 'Comment must have something';
    }
  }

  deleteComment() {
    this.item.comments.splice(this.list.indexOf(this.comment) - 1, 1)
    this.service.updateList(this.singleBoard);
    return 'Comment deleted'
  }

}
