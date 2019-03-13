import { observable, computed, action } from 'mobx';
import _ from 'lodash';
import { rootStore, RootStore } from '../../RootStore';

import TodoListService from '../services/TodoListService';

export interface TodoItem {
    id: number,
    title: string,
    isFinished: boolean
}

export interface TodoListProps{
    list: Array<TodoItem>
}

export class TodoListStore{
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
      this.rootStore = rootStore
    }

    @observable todolist: Array<TodoItem> = [];

    @computed
    get countFinishedTodoItem(): number {
      return this.todolist.filter(item => item.isFinished).length;
    }

    @computed
    get countUnFinishedTodoItem(): number {
      return this.todolist.filter(item => !item.isFinished).length;
    }
  
    @action
    async fetchAllItems() {
      try {
        const result: Array<TodoItem> = await TodoListService.fetchAllItems()
        this.todolist = result;
      } catch (error) {
        const { title, errors, code } = error;
        this.rootStore.modal.openModal({
          title,
          errors,
          code,
          isConfirmDialog: false
        });
      }
    }
  
    @action
    async deleteTodoItemByID(id: number) {
      try {
        const result: Array<TodoItem> = await TodoListService.deleteTodoItemByID(id)
        this.todolist = this.todolist.filter((todoItem: TodoItem) => todoItem.id !== id);
      } catch (error) {
        const { title, errors, code } = error;
        this.rootStore.modal.openModal({
          title,
          errors,
          code,
          isConfirmDialog: false
        });
      }
    }
  
    @action
    async addTodoItem(payload: {title: string, isFinished: boolean}) {
      try {
        const result: any = await TodoListService.addTodoItem(payload);
        if(result.errors){
          throw result;
        } else {
          this.todolist = [result, ...this.todolist];
        }
      } catch (error) {
        const { title, errors, code } = error;
        this.rootStore.modal.openModal({
          title,
          errors,
          code,
          isConfirmDialog: false
        });
      }
    }
  
    @action
    async updateTodoItem(todoItemObj: TodoItem) {
      try {
        const result: TodoItem | any = await TodoListService.updateTodoItem(todoItemObj)
        if(result.errors){
          throw result;
        } else {
          const updatedItem: TodoItem = result.item;
          this.todolist = this.todolist.map(todoItem => {
            return (todoItem.id === updatedItem.id) ? updatedItem : todoItem
          })
        }
      } catch (error) {
        const { title, errors, code } = error;
        this.rootStore.modal.openModal({
          title,
          errors,
          code,
          isConfirmDialog: false
        });
      }
    }
}
