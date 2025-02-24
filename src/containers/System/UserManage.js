import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './userManage.scss';
import { getAllUser, createNewUserService } from '../../services/userService';
import ModalUser from './ModalUser';
class UserManage extends Component {

    constructor(props) {
        //init state
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false,
        }
    }

    async componentDidMount() {
        //setstate
        await this.getAllUsers();
    }


    handleAddNewUser = () => {
        this.setState({
            isOpenModal: true
        })
    }


    toggleUserModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
        })
    }
    getAllUsers = async () => {
        let response = await getAllUser('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }
    createNewUser = async (data) => {
        // console.log('respone create new user', data);
        try {

            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUsers();
                this.setState({
                    isOpenModal: false
                })
            }
            console.log('respone create new user', response);
        } catch (error) {
            console.log(error);
        }

    }
    render() {
        // console.log('check render', this.state)
        let arrUsers = this.state.arrUsers;
        return (
            <div className='users-container'>
                <ModalUser

                    isOpen={this.state.isOpenModal}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                <div className='title text-center'>
                    Manage Users
                </div>
                <div className='mx-4'>
                    <button className='btn btn-primary px-3' onClick={() => this.handleAddNewUser()}><i className='fas fa-plus px-1'> Add new user </i></button>
                </div>
                <div className='users-table mt-5 mx-4'>
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        {arrUsers && arrUsers.map((item, index) => {
                            return (
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit'><i className='fas fa-pencil-alt'></i></button>
                                        <button className='btn-delete'><i className='fas fa-trash'></i></button>
                                    </td>
                                </tr>
                            )
                        })}

                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
