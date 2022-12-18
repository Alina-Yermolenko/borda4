export interface Board {
    _id: string,
    userId: string,
    created_by: string,
    title: string,
    description: string,
    createdDate: string,
    todo: Item[],
    done: Item[],
    inProgress: Item[],
    archive: Item[],
    __v: string,
}

export interface Item {
    title: string,
    createdDate: string,
    boardId: string,
    comments: string[],
    _id: string
} 