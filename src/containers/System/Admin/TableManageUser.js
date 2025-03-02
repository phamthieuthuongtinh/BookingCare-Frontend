import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../../store/actions";


class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: []
        }
    }
    componentDidMount() {
        this.props.fetchAllUserRedux();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                usersRedux: this.props.users
            })
        }
    }
    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id);
    }
    handleEditUser = (user) => {
        this.props.hanndleEditFromParent(user)
    }
    render() {
        let arrUsers = this.state.usersRedux;
        // console.log('check', this.props);
        // console.log('checkstate', this.state.usersRedux);
        return (
            <table id='TableManageUser'>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {arrUsers && arrUsers.length > 0 &&
                        arrUsers.map((item, index) => {
                            return (
                                <tr key={index} >
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => this.handleEditUser(item)}
                                        ><i className='fas fa-pencil-alt'></i></button>
                                        <button className='btn-delete' onClick={() => {
                                            if (window.confirm("Bạn có chắc muốn xóa không?")) {
                                                this.handleDeleteUser(item);
                                            }
                                        }}><i className='fas fa-trash'></i></button>
                                    </td>
                                </tr>
                            )

                        })
                    }
                </tbody>

            </table>
        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteAUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
