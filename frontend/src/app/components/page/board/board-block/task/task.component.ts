import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() boards: any = '';
  @Input() item: any = '';
  @Input() checkIfDone: boolean = true;
  @Input() singleBoard: any;
  @Input() nameId: string = '';
  @Input() listColor: string = '';
  showItemInput: boolean = false;
  taskname:string = '';

  constructor(
    public service: DataService
  ) { }

  ngOnInit() { 
    if(this.boards.slice(-1)[0] && this.boards.slice(-1)[0].hasOwnProperty('showItemInput')){
      this.showItemInput = this.boards.slice(-1)[0].showItemInput
    }
   }

  async addNewItem(value: string, event: any) {
    if (event.target.id.length > 0) {
      this.item.title = value;
      let info  = await this.service.createOneTask(this.singleBoard, this.nameId, value)
      this.boards.pop();
      let item = await info.message;
      this.boards.push({ 'title': item.title, 'createdDate': item.createdDate, 'comments': item.comments, _id: item._id});
      
    }
    if (event.target.id.length === 0) {
      this.item.title = value;
      await this.service.editOneTask(this.singleBoard, this.item, this.nameId, value)
    }

    if(!this.item.title){
      this.item.title = this.service.titleDiv
      this.item.invalid = true
    }
    else {
      this.item.title = this.item.title
      this.item.invalid = false;
    }

    this.showItemInput = false;
  }

  checkDone() {
    if (this.checkIfDone === true) {
      return true;
    }
    return false
  }
}
