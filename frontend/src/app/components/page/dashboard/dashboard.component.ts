import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ModalService } from 'src/app/services/modal.service';
import config from "src/config"


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  showSpinner: boolean = true;
  renderBoards: Function = this.service.renderBoards;
  showModal = this.modalService.showModal;
  showModalBoard: Function = this.modalService.showModalBoard;

  constructor(public service: DataService,
    private modalService: ModalService) {
    this.service.spinnerEvent.subscribe(() => {
      this.showSpinner = false;
    })

    this.addBoard = this.addBoard.bind(this)
    this.editItem = this.editItem.bind(this)
  }

  ngOnInit(): void {
    this.service.getBoards()
  }

  createBoard(value: boolean) {
    return this.showModal = value;
  }


  async addBoard(title: string, description: string) {
    let token = localStorage.getItem('token');

    const response = await fetch(config.hostUrl + '/boards', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "title": title,
        "description": description,
      })

    })

    let jsonResponse = await response.json()

    this.addBoardResponse(response.status, jsonResponse._doc)

  }

  addBoardResponse(status: number, jsonResponse: any) {
    if (status === 200) {
      this.service.setData({ 'title': jsonResponse.title, 'description': jsonResponse.description, '_id': jsonResponse._id, 'createdDate': jsonResponse.createdDate });
      return "Success"
    }
    else {
      return "An error occured"
    }
  }

  editItem(title: string, input: string) {
    this.service.editData(title, input);
  }

}
