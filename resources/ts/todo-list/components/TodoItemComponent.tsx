import React, { Component } from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

interface TodoItemComponentProps{
    id: number,
    title: string,
    isFinished: boolean,
    onDelete(id: number): any,
    onUpdate(data: {id: number, title: string, isFinished: boolean}): any
}

interface TodoItemComponentState{
    isEdit: boolean,
    titleValue: string,
    isFinishedValue: boolean
}

const MyListItemText = (props: {isFinished: boolean, title: string}) => {
    return (props.isFinished) ? <ListItemText primary={props.title} /> : <ListItemText primary={`(${props.title})`} />
}

export default class TodoItemComponent extends Component<TodoItemComponentProps, TodoItemComponentState>{

    constructor(props: TodoItemComponentProps) {
        super(props);
        this.state = {
            isEdit: false,
            titleValue: this.props.title,
            isFinishedValue: this.props.isFinished
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    handleInputChange(e: any){
        const newValue: string = e.target.value
        this.setState({
            titleValue: newValue
        })
    }

    handleCheckboxChange(e: any){
        const newValue: boolean = e.target.checked
        this.setState({
            isFinishedValue: newValue
        })
    }
    
    toggleEditMode(){
        if(!this.state.isEdit){
            this.setState({
                isEdit: true
            })
        } else {
            this.setState({
                titleValue: this.state.titleValue,
                isFinishedValue: this.state.isFinishedValue
            }, () => {
                this.setState({
                    isEdit: false
                })
            })
        }
    }

    onUpdate(){
        this.props.onUpdate({
            id: this.props.id, 
            title: this.state.titleValue, 
            isFinished: this.state.isFinishedValue
        })
    }

    render(){
        const {id, title, isFinished, onUpdate, onDelete} = this.props;
        return (this.state.isEdit) ?
        (
            <ListItem>
                <input
                    type="checkbox"
                    checked={this.state.isFinishedValue}
                    onChange={this.handleCheckboxChange}
                />
                <TextField
                    required
                    label="Required"
                    value={this.state.titleValue} 
                    onChange={this.handleInputChange}
                    margin="normal"
                    variant="outlined"
                />
                <Button 
                    size="small" 
                    color="secondary" 
                    variant="outlined" 
                    onClick={this.onUpdate}>Update</Button>
                <Button size="small" color="default" variant="outlined" onClick={this.toggleEditMode}>Discard</Button>

            </ListItem>
        ) : (
            <ListItem>
                <MyListItemText title={title} isFinished={isFinished} />
                <Button size="small" color="primary" variant="outlined" onClick={() => onDelete(id)}>Delete</Button>
                <Button size="small" color="default" variant="outlined" onClick={this.toggleEditMode}>Edit</Button>
            </ListItem>
        )    
    }
    
}