import { observable, computed, action } from 'mobx';
import { RootStore } from '../../RootStore';

export interface Modal{
    title: string,
    errors?: any,
    code: number,
    onAction?: any
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
        onAction: {}
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

    @action
    openModal(modalObj: Modal) {
        this.modal = {
            title: modalObj.title,
            errors: modalObj.errors,
            code: modalObj.code,
            show: true,
            onAction: modalObj.onAction
        }
    }

    @action
    closeModal() {
        this.modal = {
            title: '',
            errors: {},
            code: 0,
            show: false
        }
    }

    @action
    onAction(){
        this.modal.onAction()
    }
}