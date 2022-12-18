import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Item } from 'src/app/interfaces/interface';
import { of } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @Input() singleBoard: any;
  selectedValue: string = '';
  order: string = 'asc';
  id: number = 0;
  lists: [string, string, string] = ['todo', 'inProgress', 'done'];
  title: string = "Dashboard";
  filterInput: string = '';
  currentRoute: string = '';
  description: string = '';
  showBack: boolean = false;

  constructor(
    public service: DataService,
    private router: Router
  ) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((x: any) => {
      this.currentRoute = x.url;
    });

    if (this.router.url === "/dashboard") {
      this.service.showInDashboard = true;
      this.showBack = false
    }
    else {
      this.service.showInDashboard = !this.service.showInDashboard
      this.showBack = true;
    }

  }

  async ngOnInit() {
    this.getBoardTitleById()
  }

  async getBoardTitleById() {
    if (this.currentRoute !== '/dashboard') {
      await this.service.getBoards();
      this.title = this.singleBoard.title;
      this.description = this.singleBoard.description;
    } else {
      this.title = "Dashboard"
    }
  }

  sortItems() {
    if (this.router.url === "/dashboard") {
      this.sortBoards()
    }
    else {
      this.sortTasks()
    }
  }

  sortBoards() {
    let renderCopy = [...this.service.renderBoards]
    if (this.order === "asc") {
      switch (this.selectedValue) {
        case "name":
          this.service.renderBoards = renderCopy.sort((a: Item, b: Item): number => {
            return a.title.localeCompare(b.title);
          })
          break;
        case "date":
          this.service.renderBoards = renderCopy.sort((a: any, b: any): number => {
            return a.createdDate - b.createdDate;
          })
          break;
        case "number":
          this.service.renderBoards.map((one: any) => {
            if (!one.done) {
              one.tasksNumber = 0;
            } else {
              return one.tasksNumber = one.done.length + one.inProgress.length + one.todo.length;
            }
          })
          this.service.renderBoards.sort((a: any, b: any): number => {
            return a.tasksNumber - b.tasksNumber;
          })
          break;
      }
      return "Sorted by asc order"
    }

    if (this.order === "desc") {
      switch (this.selectedValue) {
        case "name":
          this.service.renderBoards = renderCopy.sort((a: Item, b: Item): number => {
            return b.title.localeCompare(a.title);
          })
          break;
        case "date":
          this.service.renderBoards = renderCopy.sort((a: any, b: any): number => {
            return b.createdDate - a.createdDate;
          })
          break;
        case "number":
          this.service.renderBoards.map((one: any) => {
            if (!one.done) {
              one.tasksNumber = 0;
            } else {
              return one.tasksNumber = one.done.length + one.inProgress.length + one.todo.length;
            }
          })
          this.service.renderBoards.sort((a: any, b: any): number => {
            return b.tasksNumber - a.tasksNumber;
          })
          break;
      }
      return "Sorted by desc order"

    }
    else {
      return "Not sorted"
    }
  }

  sortTasks() {
    let singleBoardCopy = { ...this.singleBoard }
    if (this.order === "asc") {
      switch (this.selectedValue) {
        case "name":
          this.lists.forEach((one: string) => {
            singleBoardCopy = this.singleBoard[one].sort((a: any, b: any): string => {
              return a.title.localeCompare(b.title);
            })
          })
          break;
        case "date":
          this.lists.forEach((status: string) => {
            singleBoardCopy = this.singleBoard[status].sort((a: Item, b: Item): number => {
              return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
            })
          })
          break;
      }
      return "Sorted by asc order"
    }
    if (this.order === "desc") {
      switch (this.selectedValue) {
        case "name":
          this.lists.forEach((status: string) => {
            singleBoardCopy = this.singleBoard[status].sort((a: any, b: any): string => {
              return b.title.localeCompare(a.title);
            })
          })
          break;
        case "date":
          this.lists.forEach((status: string) => {
            singleBoardCopy = this.singleBoard[status].sort((a: Item, b: Item): number => {
              return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
            })
          })
          break;
      }
      return "Sorted by desc order"
    }
    return "Not sorted"

  }

  changeOrder(value: string) {
    if (value === 'desc' || value === 'asc') {
      this.order = value;
      this.sortItems();
      return 'Order changed to ' + value;
    } else {
      return `Order ${value} doesn't exist`
    }
  }

  async filterItems() {
    this.getBoardTitleById()
    if (this.router.url === "/dashboard") {
      this.service.getFilteredBoards(this.filterInput);
    } else {
      this.service.getFilteredTasks(this.filterInput, this.singleBoard)
    }
  }

}
