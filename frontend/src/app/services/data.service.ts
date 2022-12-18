import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import config from 'src/config';
import { Board } from '../interfaces/interface';
import { Item } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  boards: any = [{
    _id: '',
    userId: '',
    created_by: '',
    title: '',
    description: '',
    createdDate: '',
    todo: [],
    done: [],
    inProgress: [],
    archive: [],
    __v: '',
  }];

  filteredInput: any;
  renderBoards: any = [];
  renderItems: any = {};
  id: string = '';
  lists: string[] = ['todo', 'inProgress', 'done'];
  boardsDiv: string = '';
  item: Item = {
    title: '',
    createdDate: '',
    boardId: '',
    comments: [],
    _id: ''

  };
  list: any;
  nameId: string = '';
  singleBoard: any = { todo: [], inProgress: [], done: [] };
  toggleInput: boolean = false;
  showInDashboard = true;
  titleDiv: string = '';

  @Output() spinnerEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router
  ) { }

  //Board Functions

  giveId() {
    return this.boards.map((element: Board, index: number) => {
      Object.assign(element, { id: element._id });
    })
  }

  async getOneBoard(item: Item) {
    let token = localStorage.getItem('token');

    const response = await fetch(config.hostUrl + `/boards/${item._id}`, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      },
    });

    if (!response) {
      return;
    }
    this.spinnerEvent.emit();

  }

  async getBoards(): Promise<any> {
    let token = localStorage.getItem('token');
    const response = await fetch(config.hostUrl + '/boards', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      },
    });
    if (!response) return;
    this.spinnerEvent.emit();

    let info = await response.json();
    this.getBoardsResponse(response.status, info.boards)

  }

  getBoardsResponse(status: number, info: any) {
    if (status === 200) {
      this.boards = info;
      this.renderBoards = this.boards;
    }
    if (status === 400) {
      return 'No boards';
    }
    if (status === 500) {
      return 'Server error';
    }
    return this.boards
  }

  setData(title: any): any {
    this.boards.push(title);
    this.getFilteredBoards('')
  }


  editData(item: any, input: string) {
    if (this.boards) {
      this.boards.map((board: any) => {
        if (board._id === item._id) {
          board.title = input
          changeOneBoard()
          async function changeOneBoard() {
            let token = localStorage.getItem('token');
            const response = await fetch(config.hostUrl + `/boards/${board._id}`, {
              method: 'PUT',
              credentials: 'same-origin',
              headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                "title": input,
              })
            })

            if (!item.title) {
              item.title = 'Please, provide a title'
              board.invalid = true
            }
            else {
              item.title = item.title
              board.invalid = false
            }

            return response.status
          }
          this.editBoardResponse(400, input)
        }
      })
    }
    else {
      'Boards not found'
    }
  }

  editBoardResponse(status: number, input: string) {

    if (input.length <= 0) {
      return 'Please, provide input';
    }

    if (status === 200) {
      return 'Board title changed';
    }
    if (status === 400) {
      return 'No such board';
    }
    else {
      return 'No such board'
    }
  }

  async deleteBoard(board: Board) {
    let token = localStorage.getItem('token');
    const response = await fetch(config.hostUrl + `/boards/${board._id}`, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      },
    })

    this.deleteBoardResponse(response.status, board)
  }

  deleteBoardResponse(status: number, board: any) {
    if (status === 200) {
      this.boards.splice(this.boards.indexOf(board), 1);
      this.getFilteredBoards('')
      return 'Board deleted succesfully'
    }
    else {
      return 'Server error';
    }
  }

  getFilteredBoards(input: string) {
    if (input.length > 0) {
      this.renderBoards = this.boards.filter((board: any) => {
        board.subTitle = '';
        board.subTitleExist = false;
        return this.renderBoards = board.title.toLocaleLowerCase().includes(input);
      })

      const unique = (value: any, index: any, self: any) => {
        return self.indexOf(value) === index
      }

      this.boards.filter((board: any, index: number) => {
        this.lists.forEach((status: string) => {
          let boardsToFilter = this.boards[index][status];
          if (boardsToFilter) {
            this.boards[index][status].forEach((item: Item) => {
              let result = item.title.toLowerCase().includes(input.toLowerCase());
              if (result === true && board._id === item.boardId) {
                board.subTitleExist = true;
                board.subTitle += item.title + ' ';
                this.renderBoards.push(board);
                this.renderBoards = this.renderBoards.filter(unique)
              }
            })
          }
          else {
            return;
          }
        })
      })

      console.log(this.boards)


    } else {
      this.renderBoards = this.boards;
    }
  }

  getSingle() {
    this.id = this.router.url.split('/')[2];
    this.singleBoard = this.boards.find((one: Board, index: number) => {
      return one._id === this.id;
    });
    return this.singleBoard;
  }

  //Task Functions

  async createOneTask(singleBoard: any, nameId: string, title: string) {
    let token = localStorage.getItem('token');

    if (!nameId || nameId.length === 0) {
      return "Status of task not defined"
    }
    if (nameId == 'todo' || nameId == 'inProgress' || nameId == 'done') {
      const response = await fetch(config.hostUrl + `/items/${singleBoard._id}`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "title": title || '',
          "status": nameId
        })
      })
      this.createOneTaskResponse(response.status, singleBoard, nameId)
      let info = await response.json()

      return info;
    } else {

      return "NameId doesn't exist"
    }
  }

  createOneTaskResponse(status: number, singleBoard: any, nameId: string) {
    if (status === 200) {
      singleBoard[nameId] = singleBoard[nameId]
      return "Task created succesfully"
    }
    else {
      return "Task not created"
    }
  }

  async getItems() {
    let token = localStorage.getItem('token');
    const response = await fetch(config.hostUrl + `/items/${this.singleBoard._id}`, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      },
    }).then(async (response) => await response.json());
    this.getItemsResponse(response.status, response.singleBoard);

  }

  getItemsResponse(status: number, singleBoard: any) {
    if (status === 200) {
      this.renderItems[this.nameId] = singleBoard[this.nameId];
      return 'Tasks shown'
    }
    else {
      return 'No tasks'
    }
  }

  async updateList(singleBoard: any) {
    let token = localStorage.getItem('token');
    const response = await fetch(config.hostUrl + `/items`, {
      method: 'PUT',
      credentials: 'same-origin',
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...singleBoard
      })
    })

    console.log(await response.json())

    this.updateListResponse(response.status)

  }

  updateListResponse(status: number) {
    if (status === 200) {
      return "List updated successfully";
    }
    else {
      return "List not updated";
    }
  }

  async editOneTask(board: any, item: Item, nameId: string, title: string) {
    let token = localStorage.getItem('token');

    if (!nameId) {
      return "Status not defined"
    }
    if (!title) {
      this.titleDiv = "Please, provide a title"
      return "Please, provide a title"
    }

    const response = await fetch(config.hostUrl + `/items/${item._id}`, {
      method: 'PUT',
      credentials: 'same-origin',
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "board": board,
        "title": title,
        "status": nameId
      })
    })

    return this.editOneTaskResponse(response.status)
  }

  editOneTaskResponse(status: number) {
    if (status === 200) {
      return 'Task edited succesfully'
    }
    else {
      return 'Task not edited'
    }
  }

  async deleteOneTask(nameId: string, item: Item) {
    let token = localStorage.getItem('token');
    const response = await fetch(config.hostUrl + `/items/${item._id}`, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "status": nameId
      })
    })

    this.deleteOneTaskResponse(response.status)
  }

  deleteOneTaskResponse(status: number) {
    if (status === 200) {
      return "Task deleted successfully"
    } else {
      return "Task not deleted"
    }
  }

  getFilteredTasks(input: string, board: any) {
    let boardId: number;
    if (board) {
      boardId = this.boards.findIndex((one: Board) => {
        return one._id === board._id
      })
      return this.lists.map((status: string) => {
        if (input.length > 0) {
          console.log(board[status])
          board[status] = board[status].filter((item: Item) => {
            if (item.title) {
              return item.title.toLowerCase().includes(input.toLowerCase());
            }
            return
          })
        } else {
          board[status] = this.boards[boardId][status as keyof Board];
        }
      })
    }
    else {
      return
    }
  }
}
