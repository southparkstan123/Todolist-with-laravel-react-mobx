import { observable, computed, action } from 'mobx';
import { RootStore, rootStore } from '../../RootStore';
import _ from 'lodash';

export interface Modal{
    title: string,
    errors?: any,
    code: number,
    isConfirmDialog: boolean,
    payload?: any,
    actionType?: string | undefined
}

interface ModalState extends Modal{
    show: boolean
}

export class ModalStore{

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }

    @observable modal: ModalState = {
        title: '',
        errors: {},
        code: 0,
        show: false,
        actionType: undefined,
        payload: {},
        isConfirmDialog: false
    }

    @computed
    get isShow(): boolean{
        return this.modal.show;
    }

    @computed
    get getCode(): number{
        return this.modal.code;
    }

    @computed
    get getTitle(): string{
        return this.modal.title;
    }

    @computed
    get getErrors(): object | undefined{
        return this.modal.errors;
    }

    @computed
    get isConfirmDialog(): boolean{
        return this.modal.isConfirmDialog;
    }

    @action.bound
    openModal(modalObj: Modal) {
        this.modal = {
            title: modalObj.title,
            errors: modalObj.errors,
            code: modalObj.code,
            show: true,
            actionType: modalObj.actionType,
            payload: modalObj.payload,
            isConfirmDialog: modalObj.isConfirmDialog
        }
    }

    @action
    closeModal() {
        this.modal = {
            title: '',
            errors: {},
            code: 0,
            show: false,
            isConfirmDialog: false
        }
    }

    @action
    onAction(){
        switch(this.modal.actionType){
            case 'deleteTodoItem':
                rootStore.todoList.deleteTodoItemByID(this.modal.payload.id)
                break;
            default:
                break;
        }
        this.closeModal();
    }
}