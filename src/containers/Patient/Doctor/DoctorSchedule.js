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
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
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
            console.log('check res', res)
        }
    }
    render() {
        let { allDays } = this.state;
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
