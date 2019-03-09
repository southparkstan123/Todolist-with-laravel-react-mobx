import { ModalStore } from './modal/stores/ModalStore';
import { TodoListStore } from './todo-list/stores/TodoListStore';

export class RootStore {
    public modal: ModalStore;
    public todoList: TodoListStore;

    constructor() {
        this.modal = new ModalStore(this);
        this.todoList = new TodoListStore(this);
    }
}

export const rootStore = new RootStore();