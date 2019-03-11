import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import DoneIcon from '@material-ui/icons/Done';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';

import { TodoItem, TodoListStore } from '../stores/TodoListStore';
import TodoItemComponent from './TodoItemComponent';
import TodoForm from './TodoForm';
import { rootStore } from '../../RootStore';

const TodoSummary = (props: {finishedNum: number, unFinishedNum: number}) => {
    return <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={0}
    >
        <Grid item xs={12} sm={6} container justify="center" alignItems="center">
            <Badge badgeContent={props.finishedNum} color="primary">
                <Typography><DoneIcon />Finished Items</Typography>
            </Badge>
        </Grid>
        <Grid item xs={12} sm={6} container justify="center" alignItems="center">
            <Badge badgeContent={props.unFinishedNum} color="secondary">
                <Typography><DoneOutlineIcon />(UnFinished Items)</Typography>
            </Badge>
        </Grid>
    </Grid>
}

@inject('rootStore')
@observer
export default class TodoList extends Component{

    constructor(props: any) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    componentDidMount () { 
        rootStore.todoList.fetchAllItems();
    }

    onDelete(id: number){
        rootStore.modal.openModal({
            title: 'Are you sure?',
            code: 200,
            actionType: 'deleteTodoItem',
            payload: {id},
            isConfirmDialog: true
        })
    }

    onUpdate(data: {id: number, title: string, isFinished: boolean}){
        rootStore.todoList.updateTodoItem(data);
    }

    onSubmit(data: {title: string, isFinished: boolean}){
        rootStore.todoList.addTodoItem(data);
    }

    render(){
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <TodoForm onSubmit={this.onSubmit}/>
                <TodoSummary finishedNum={rootStore.todoList.countFinishedTodoItem} unFinishedNum={rootStore.todoList.countUnFinishedTodoItem}/>
                <List>
                    {
                        rootStore.todoList.todolist.map((item: TodoItem) => 
                            <TodoItemComponent
                                key={item.id} 
                                id={item.id} 
                                title={item.title} 
                                isFinished={item.isFinished} 
                                onDelete={this.onDelete}
                                onUpdate={this.onUpdate}
                            />
                        )
                    }
                </List>
            </Grid>
        )
    }
}