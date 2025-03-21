import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss';
import { languages } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor, postSendRedemy } from '../../../services/userService';
import moment from 'moment';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).add(0, 'days').startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false
        }
    }

    async componentDidMount() {

        this.getdataPatient();

    }
    getdataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {

            await this.getdataPatient();

        })
    }
    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
    }
    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false
        })
    }
    sendRedemy = async (dataFromChild) => {

        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true,
        })
        let res = await postSendRedemy({
            email: dataFromChild.email,
            imageBase64: dataFromChild.imageBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName,
        });
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false,
            })
            toast.success('Send  redemy succeed');
            await this.getdataPatient();
            this.closeRemedyModal()
        } else {
            this.setState({
                isShowLoading: false,
            })
            toast.error('send redemy failed')
        }
    }
    render() {
        // console.log('check state', this.state)
        let { language } = this.props;
        let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text="Loading ..."

                >
                    <div className='manage-patient-container'>
                        <div className='m-p-title'>
                            Quan ly benh nhan kham benh
                        </div>
                        <div className='manage-patient-body row'>
                            <div className='col-4 form-group'>
                                <label>Chon ngay xem</label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}

                                />
                            </div>
                            <div className='col-12 table-manage-patient'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Thoi gian</th>
                                            <th>Ho va ten</th>
                                            <th>Gioi tinh</th>
                                            <th>Dia chi</th>

                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataPatient && dataPatient.length > 0 ?
                                            dataPatient.map((item, index) => {
                                                let time = language === languages.VI ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn

                                                let gender = language === languages.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn

                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{time}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{gender}</td>
                                                        <td>{item.patientData.address}</td>

                                                        <td>
                                                            <button className='mp-btn-confirm' onClick={() => this.handleBtnConfirm(item)}>Xac nhan</button>

                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <>
                                                <tr>
                                                    <td className='text-center' colSpan={6}>Chua co lich trong hom nay</td>

                                                </tr>
                                            </>
                                        }
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                    <RemedyModal
                        isOpenModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRedemy={this.sendRedemy}
                    />

                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
