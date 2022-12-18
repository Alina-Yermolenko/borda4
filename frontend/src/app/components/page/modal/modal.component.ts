import { Component, OnInit, Input, Output } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() handler!: Function;
  @Input() editHandler!: Function;
  @Output() showModalBoard: EventEmitter<boolean> = new EventEmitter();

  modalTitle: string = '';
  inputTitle: string = '';
  inputText: string = '';
  showModal: boolean = false;
  textDiv: string = '';
  showEditButton: boolean = true;

  constructor(
    public modalService: ModalService,
  ) {
  }

  ngOnInit(): void {
    this.changeModalTitle();
  }

  displayModal() {
    this.modalService.showCreateModal = true;
    this.modalService.showEditButton = false
    this.showModalBoard.emit(false);
  }

  onSubmit(form: NgForm) {
    if (!this.inputTitle) {
      return this.textDiv = 'Title is required'
    } else {
      this.handler(this.inputTitle, this.inputText);
      this.showModalBoard.emit(this.showModal);
      return;
    }
  }

  editInfo() {
    this.modalService.showEditButton = false;
    this.modalService.showCreateModal = true;
    this.editHandler(this.modalService.title, this.inputTitle);
    this.showModalBoard.emit(this.showModal);
  }

  changeModalTitle() {
    if (this.modalService.showEditButton === false) {
      return this.modalTitle = 'Create'
    } else {
      return this.modalTitle = 'Edit'
    }
  }

}
