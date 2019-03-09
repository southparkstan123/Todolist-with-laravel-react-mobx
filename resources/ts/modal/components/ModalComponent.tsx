import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import { observer, inject } from 'mobx-react';
import { Modal, ModalStore } from '../stores/ModalStore';
import { rootStore } from '../../RootStore';
import { withStyles } from '@material-ui/core/styles';

@inject('rootStore')
@observer
export class ModalComponent extends Component{

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
                                (rootStore.modal.onAction) ? <Button onClick={() => rootStore.modal.onAction()} color="primary" autoFocus>OK</Button> : false
                            }
                            <Button onClick={() => rootStore.modal.closeModal()} color="primary">Cancel</Button>
                        </DialogActions>
                    </Dialog>)
    }
    
}