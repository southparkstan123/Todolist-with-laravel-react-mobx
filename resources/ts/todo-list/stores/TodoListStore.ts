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
        this.rootStore.modal.openModal({
          title: error.title,
          errors: error.errors,
          code: error.code
        });
      }
    }
  
    @action
    async deleteTodoItemByID(id: number) {
      try {
        const result: Array<TodoItem> = await TodoListService.deleteTodoItemByID(id)
        this.todolist = this.todolist.filter((todoItem: TodoItem) => todoItem.id !== id);
      } catch (error) {
        this.rootStore.modal.openModal({
          title: error.title,
          errors: error.errors,
          code: error.code,
        })
      }
    }
  
    @action
    async addTodoItem(payload: {title: string, isFinished: boolean}) {
      try {
        const result: any = await TodoListService.addTodoItem(payload);
        if(result.errors){
          throw result
        } else {
          this.todolist = [result, ...this.todolist];
        }
      } catch (error) {
        this.rootStore.modal.openModal({
          title: error.title,
          errors: error.errors,
          code: error.code
        })
      }
    }
  
    @action
    async updateTodoItem(todoItemObj: TodoItem) {
      try {
        const updatedItem: TodoItem = await TodoListService.updateTodoItem(todoItemObj)
        this.todolist = this.todolist.map(todoItem => {
          return (todoItem.id === updatedItem.id) ? updatedItem : todoItem
        })
      } catch (error) {
        this.rootStore.modal.openModal({
          title: error.title,
          errors: error.errors,
          code: error.code
        });
      }
    }
}
