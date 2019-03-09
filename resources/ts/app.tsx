import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import TodoList from './todo-list/components/TodoList';
import { rootStore } from './RootStore';
import { Provider } from 'mobx-react';

import { ModalComponent } from './modal/components/ModalComponent';

export default class App extends Component {
    render() {
        return (
            <Provider rootStore={rootStore}>
                <Fragment>
                    <div className="container">
                        <TodoList />
                    </div>
                    <ModalComponent/>
                </Fragment>   
            </Provider>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App/>, document.getElementById('app'));
}
