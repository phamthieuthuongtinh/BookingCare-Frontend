import React, { Component } from 'react';
import { connect } from "react-redux";
import './RemedyModal.scss';
import { CommonUtils, languages } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import _ from 'lodash';
import * as actions from '../../../store/actions';
import { toast } from 'react-toastify';
import moment from 'moment';
class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            imageBase64: "",

        }
    }
    componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);

            this.setState({
                imageBase64: base64
            })
        }
    }
    handleSendRemedy = () => {
        this.props.sendRedemy(this.state)
    }


    render() {

        let { isOpenModal, closeRemedyModal, dataModal, sendRedemy } = this.props


        return (
            // toggle={ }
            <React.Fragment>

                <Modal isOpen={isOpenModal}

                    size='lg'
                    centered
                    backdrop={isOpenModal}>
                    <div className='modal-header'>
                        <h5 className='modal-title'>Xac nhan Redemy</h5>
                        <button type="button" onClick={closeRemedyModal} className="close" aria-label="Close">x</button>
                    </div>

                    <ModalBody>
                        <div className='row'>
                            <div className='col-6 form-group'>


                                <label>Email benh nha</label>
                                <input type='email' className='form-control' value={this.state.email}
                                    onChange={(event) => this.handleOnChangeEmail(event)} />

                            </div>
                            <div className='col-6 form-group'>


                                <label>Chon file</label>
                                <input className='form-control-file' type='file'
                                    onChange={(event) => this.handleOnChangeImage(event)}
                                />

                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.handleSendRemedy()}>
                            Confirm
                        </Button>{' '}
                        <Button color="secondary" onClick={closeRemedyModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment >
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
