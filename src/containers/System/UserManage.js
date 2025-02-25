import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './userManage.scss';
import { getAllUser, createNewUserService, deleteUserService, updateUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';
class UserManage extends Component {

    constructor(props) {
        //init state
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenModalEditUser: false,
            userEdit: {}
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

    toggleEditUserModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
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
                emitter.emit("EVENT_CLEAR_MODAL_DATA");
            }
            console.log('respone create new user', response);
        } catch (error) {
            console.log(error);
        }

    }
    handleDeleteUser = async (user) => {
        console.log('dele user', user);
        try {
            let respone = await deleteUserService(user.id);
            if (respone && respone.errCode === 0) {
                await this.getAllUsers();
            } else {
                alert(respone.errMessage);
            }
            console.log(respone);
        } catch (error) {
            console.log(error);
        }
    }
    handleEditUser = (user) => {
        // console.log('check edit user', user);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }
    doEditUser = async (user) => {
        try {
            let res = await updateUserService(user);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllUsers();
            }
            else {
                alert(res.errMessage);
            }
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
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleEditUserModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }

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
                                        <button className='btn-edit' onClick={() => { this.handleEditUser(item) }}><i className='fas fa-pencil-alt'></i></button>
                                        <button className='btn-delete' onClick={() => {
                                            if (window.confirm("Bạn có chắc muốn xóa không?")) {
                                                this.handleDeleteUser(item);
                                            }
                                        }}><i className='fas fa-trash'></i></button>
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
