import { Component, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { EventEmitter } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})

export class BoardListComponent implements OnInit {
  @Input() text = '';
  @Input() item: any = '';
  @Input() list: any = ''
  @Output() showModalBoard: EventEmitter<boolean> = new EventEmitter();
  showModal: boolean = true;
  id: any[] = this.service.giveId();
  date: Date = new Date();

  constructor(
    public service: DataService,
    private modalService: ModalService,
  ) { }

  async ngOnInit() {
    if (this.item.createdDate) {
      this.date = new Date(+this.item.createdDate);
      return this.date;
    } else {
      return this.date
    }
  }

  editBoard(itemTitle: string) {
    this.modalService.showCreateModal = false;
    this.modalService.setEditData(itemTitle)
    this.showModalBoard.emit(this.showModal);
    this.modalService.showEditButton = true;
  }

  deleteBoard() {
    this.service.deleteBoard(this.item);
    return 'Call for deleting board'
  }
}
