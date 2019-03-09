import { TodoItem } from '../stores/TodoListStore';
import axios, { AxiosResponse } from 'axios';

export default class TodoListService{
    static async fetchAllItems(): Promise<Array<TodoItem>>{
        try {
            const result: AxiosResponse<any> = await axios.get('/api/v1/todos');
            return result.data;
        } catch (error) {
            return error
        }
    }

    static async addTodoItem(payload: {title: string}): Promise<any>{
        try {
            const result: AxiosResponse<any> = await axios.post('/api/v1/todos', payload);
            if(result.data.errors){
                const errorObj: any = {
                    title: result.data.title,
                    code: result.data.code,
                    errors: result.data.errors
                }
                return errorObj;
            } else {
                return result.data.item;
            }
        } catch (error) {
            return error;
        }
    }
    static async updateTodoItem(todoItemObj: TodoItem): Promise<TodoItem>{
        try {
            const result: AxiosResponse<any> = await axios.put('/api/v1/todos/' + todoItemObj.id, todoItemObj);
            return result.data.item;
        } catch (error) {
            return error
        }
    }

    static async deleteTodoItemByID(id: number): Promise<any>{
        try {
            const result: AxiosResponse<any> = await axios.delete('/api/v1/todos/' + id);
            return result.data;
        } catch (error) {
            return error
        }
    }
}