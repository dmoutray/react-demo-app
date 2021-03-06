import React from "react";

import Notification from "../components/notifications/notification";

export default class Login extends React.Component {

    /**
     * Component for the Login page
     */

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            error: {
                status: false,
                message: ''
            }
        }
    }

    handleChange = (event) => {
        this.setState({
            userName: event.target.value
        })
    }

    validateLoginForm = () => {
        if (this.state.userName) {
            sessionStorage.setItem('userName', this.state.userName)
            this.props.history.push('/todo')
        } else {
            this.setState({
                error: {status: true, message: 'Username cannot be empty'}
            }, () => {
                setTimeout(() => {
                    this.setState({
                        error: {...this.state.error, status: false}
                    },)
                }, 5000)
            })
        }
    }


    render() {
        return (
            <div className={'login-container'}>
                <Notification error={this.state.error}/>
                <div className={'login'}>
                    <h1>Todo App</h1>
                    <div className='login-form'>
                        <input type={'text'} onChange={this.handleChange} placeholder={'Enter a username...'}/>
                        <button className={'button primary'} onClick={this.validateLoginForm}>Login</button>
                    </div>
                </div>
            </div>
        )
    }
}
