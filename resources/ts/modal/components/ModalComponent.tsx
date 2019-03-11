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

interface ModalComponentProps{}

interface ModalComponentState{
    isOk: boolean;
}

@inject('rootStore')
@observer
export class ModalComponent extends Component<ModalComponentProps, ModalComponentState>{

    // codeMapClass = (code: number): string => {
    //     const codeStr: string = code.toString();
    //     if(/2[0-9][0-9]/.test(codeStr)){
    //         return 'green';
    //     } else if (/[4-5][0-9][0-9]/.test(codeStr)) {
    //         return 'red';
    //     } else {
    //         return 'black';
    //     }
    // }

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
        // const MyDialogTitle = withStyles({
        //     root: {
        //         'background-color': this.codeMapClass(rootStore.modal.getCode)
        //     },
        // })(DialogTitle);

        return  (<Dialog 
                        fullScreen={false} 
                        open={rootStore.modal.isShow} 
                        onClose={() => rootStore.modal.closeModal()} 
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">{rootStore.modal.getTitle}</DialogTitle>
                        {/* <DialogContentText>{rootStore.modal.getTitle}</DialogContentText> */}
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