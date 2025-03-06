import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import './DoctorSchedule.scss';
import { getDetailInforDoctor } from '../../../services/userService';
import { languages } from '../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getScheduleDoctorByDateService } from '../../../services/userService';
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvalableTime: []
        }
    }
    async componentDidMount() {
        let { language } = this.props;
        this.setArrDays(language);
    }
    setArrDays = (language) => {

        // console.log(moment(new Date()).format('dddd-DD/MM'));
        // console.log(moment(new Date()).locale('en').format('ddd-DD/MM'));

        let arrDate = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === languages.VI) {
                let firstLetter = moment(new Date()).add(i, "days").format("dddd - DD/MM").charAt(0).toUpperCase();
                object.label = firstLetter + moment(new Date()).add(i, "days").format("dddd - DD/MM").slice(1);
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd-DD/MM');
            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            arrDate.push(object)
        }

        this.setState({
            allDays: arrDate
        })
    }

    componentDidUpdate(preProps, preState, snapshot) {

        if (this.props.language !== preProps.language) {
            this.setArrDays(this.props.language)
        }
    }
    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await getScheduleDoctorByDateService(doctorId, date);

            if (res && res.errCode === 0) {
                this.setState({
                    allAvalableTime: res.data ? res.data : []
                })

            }
            console.log('check res', res)
        }
    }
    render() {
        let { allDays, allAvalableTime } = this.state;
        let { language } = this.props
        return (
            <React.Fragment>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option value={item.value} key={index}>{item.label}</option>
                                    )
                                })
                            }



                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <i className='fas fa-calendar-alt'> <span>Lịch khám</span></i>
                        </div>
                        <div className='time-content'>
                            {allAvalableTime && allAvalableTime.length > 0 ?
                                allAvalableTime.map((item, index) => {
                                    let timeDisplay = language === languages.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                    return (
                                        <button key={index}>{timeDisplay}</button>
                                    )
                                })

                                :

                                <span>Bác sĩ không có lịch làm việc trong ngày này. Vui lòng chọn ngày khác!</span>
                            }


                        </div>
                    </div>
                </div>
            </React.Fragment >


        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
