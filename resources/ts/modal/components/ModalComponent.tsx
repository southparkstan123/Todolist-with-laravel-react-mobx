import React, { Component, Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import { observer, inject } from 'mobx-react';
import { Modal, ModalStore } from '../stores/ModalStore';
import { rootStore } from '../../RootStore';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

interface ModalComponentProps{}

interface ModalComponentState{
    isOk: boolean;
}

const ErrorDetail = (props: {errorObj: object | undefined}) => {
    const items: Array<string> = _.chain(props.errorObj).values().flattenDeep().value();
    return (
        <div>
            <List>
                <ListItem>
                    {
                        items.map((item: string, index: number) => <ListItemText key={index} primary={item} />)
                    }
                </ListItem>
            </List>
        </div>
    )
}

@inject('rootStore')
@observer
export class ModalComponent extends Component<ModalComponentProps, ModalComponentState>{

    constructor(props: ModalComponentProps){
        super(props)
        this.state = {
            isOk: false
        }
        this.handleAction = this.handleAction.bind(this);
    }

    handleAction(){
        this.setState({
            isOk: true
        }, () => rootStore.modal.onAction())
    }

    render(){
        return  (<Dialog 
                        fullScreen={false} 
                        open={rootStore.modal.isShow} 
                        onClose={() => rootStore.modal.closeModal()} 
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">{rootStore.modal.getTitle}</DialogTitle>
                        <ErrorDetail errorObj={rootStore.modal.getErrors}></ErrorDetail>
                        <DialogActions>
                            {
                                (rootStore.modal.isConfirmDialog) ? 
                                <Fragment>
                                    <Button onClick={this.handleAction} color="primary" autoFocus>OK</Button> 
                                    <Button onClick={() => rootStore.modal.closeModal()} color="primary">Cancel</Button>
                                </Fragment> : 
                                    <Button onClick={() => rootStore.modal.closeModal()} color="primary">OK</Button> 
                            }
                        </DialogActions>
                    </Dialog>)
    }
    
}