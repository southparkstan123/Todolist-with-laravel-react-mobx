import { TodoItem } from '../stores/TodoListStore';
import axios, { AxiosResponse } from 'axios';
import { DialogTitle } from '@material-ui/core';

export default class TodoListService{
    static async fetchAllItems(): Promise<Array<TodoItem>>{
        try {
            const result: AxiosResponse<any> = await axios.get('/api/v1/todos');
            return result.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async addTodoItem(payload: {title: string}): Promise<any>{
        try {
            const result: AxiosResponse<any> = await axios.post('/api/v1/todos', payload);
            return result.data.item;
        } catch (error) {
            return error.response.data;
        }
    }
    static async updateTodoItem(todoItemObj: TodoItem): Promise<TodoItem>{
        try {
            const result: AxiosResponse<any> = await axios.put('/api/v1/todos/' + todoItemObj.id, todoItemObj);
            return result.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async deleteTodoItemByID(id: number): Promise<any>{
        try {
            const result: AxiosResponse<any> = await axios.delete('/api/v1/todos/' + id);
            return result.data;
        } catch (error) {
            return error.response.data;
        }
    }
}