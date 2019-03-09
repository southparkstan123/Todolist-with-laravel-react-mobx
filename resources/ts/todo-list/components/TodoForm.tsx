import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

interface TodoFormProps{
    onSubmit(data: {title: string, isFinished: boolean}): void
}

interface TodoFormState{
    titleValue: string
}

export default class TodoForm extends Component<TodoFormProps, TodoFormState>{
    constructor(props: TodoFormProps) {
        super(props);

        this.state = {
            titleValue: '',
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e: any){
        const newValue: string = e.target.value
        this.setState({
            titleValue: newValue
        })
    }

    render(){
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <TextField
                    required
                    label="Required"
                    value={this.state.titleValue} 
                    onChange={this.handleInputChange}
                    margin="normal"
                    variant="outlined"
                />
                <Button size="small" color="default" variant="outlined" onClick={() => {
                    this.props.onSubmit({title: this.state.titleValue, isFinished: false})
                }}>Submit</Button>
            </Grid>
        )
    }
}