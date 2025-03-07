import React, { Component } from 'react';
import { connect } from "react-redux";
// import './ProfileDoctor.scss';
import { languages } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { getProfileDoctorByIdService } from '../../../services/userService'
class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data
        })
    }
    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorByIdService(id);
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
        if (this.props.doctorId !== prevProps.doctorId) {
            // let data = this.getInforDoctor(this.props.doctorId);
            // this.setState({
            //     dataProfile: data
            // })
        }
    }

    render() {
        console.log('check state profile', this.state)
        return (
            <React.Fragment>
                Hello from profile docotr
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
