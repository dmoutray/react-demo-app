import React from "react";

import Header from "../components/header";
import Modal from "../components/modals/modal"
import Notification from "../components/notifications/notification";
import TodoItems from "../components/todo-app/todo-items";
import TodoForm from "../components/todo-app/todo-form";

import {EDIT_DEFAULT} from "../constants/state-defaults";
import {
    handleAddItem,
    handleChange,
    handleDeleteItem,
    handleEdit,
    handleEditItem,
    handleResetEditState,
    handleSetCompleted,
    handleUpdateItem
} from "../change-handlers/handle-changes";


export default class TodoApp extends React.Component {

    /**
     * Main Application
     */

    constructor(props) {
        super(props);
        this.state = {
            userName: function(){
                let userName = sessionStorage.getItem('userName')
                if (userName){
                    return userName
                } else {
                    props.history.push('/login')
                }

            }(),
            dateValue: '',
            message: '',
            edit: EDIT_DEFAULT,
            error: {
                status: false,
                message: ''
            },
            dateList: [],
            todoItems: []
        }

        /* Bind these functions since they are imported yet required access to this.state */
        this.handleAddItem = handleAddItem.bind(this)
        this.handleEdit = handleEdit.bind(this)
        this.handleEditItem = handleEditItem.bind(this)
        this.handleDeleteItem = handleDeleteItem.bind(this)
        this.handleChange = handleChange.bind(this)
        this.handleResetEditState = handleResetEditState.bind(this)
        this.handleSetCompleted = handleSetCompleted.bind(this)
        this.handleUpdateItem = handleUpdateItem.bind(this)
    }

    sortTodoItems = () => {
        /**
         * Sort todo items by completed state and then by date
         */

        let sortDate = this.state.todoItems.sort(function (a, b) {
            let dateA = new Date(a.dateValue), dateB = new Date(b.dateValue);
            return dateA - dateB
        });
        let sortCompleted = sortDate.sort(function (a, b) {
            let dateA = a.completed, dateB = b.completed
            return dateB - dateA;
        });
        this.setState({todoItems: sortCompleted})
    }

    render() {
        return (
            <>
                <Header userName={this.state.userName}/>
                <div className='flex-container'>
                    <Notification error={this.state.error}/>
                    <Modal edit={this.state.edit}
                           handleUpdateItem={this.handleUpdateItem}
                           handleEdit={this.handleEdit}
                           handleResetEditState={this.handleResetEditState}
                    />
                    <TodoForm message={this.state.message}
                              dateValue={this.state.dateValue}
                              handleAddItem={this.handleAddItem}
                              handleChange={this.handleChange}
                    />
                    <TodoItems todoItems={this.state.todoItems}
                               handleSetCompleted={this.handleSetCompleted}
                               handleDeleteItem={this.handleDeleteItem}
                               handleEditItem={this.handleEditItem}
                    />
                </div>
            </>
        )
    }
}
