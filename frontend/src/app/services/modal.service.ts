import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  showModal = false;
  showEditButton = false;
  showCreateModal = true;
  title: string = '';

  constructor() { }

  showModalBoard() {
    return this.showModal = true;
  }

  setEditData(item: any) {
    this.showCreateModal = false;
   return this.title = item;
  }
}
