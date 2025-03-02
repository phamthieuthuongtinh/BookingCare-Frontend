import React, { Component } from 'react';
import Slider from "react-slick";
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import { FormattedMessage } from 'react-intl';
import { languages } from '../../../utils';
// import "./OutStandingDoctor.scss";


class OutStandingDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: []
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorRedux
            })
        }
    }
    componentDidMount() {
        this.props.loadTopDoctors();
    }
    render() {
        // console.log('chech topDoctorRedux', this.props.topDoctorRedux)
        let arrDoctors = this.state.arrDoctors;

        let language = this.props.language;
        // arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors)

        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id='homepage.outstanding-doctor' /></span>
                        <button className='btn-section'><FormattedMessage id='homepage.see-more' /></button>
                    </div>

                    <div className='section-body'>
                        <Slider {...this.props.settings}>

                            {arrDoctors && arrDoctors.length > 0 && arrDoctors.map((item, index) => {
                                let imageBase64 = '';
                                if (item.image) {
                                    imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                }
                                let nameVi = `${item.positionData.ValueVi}, ${item.firstName} ${item.lastName}`;
                                let nameEn = `${item.positionData.valueEn} ${item.firstName} ${item.lastName}`
                                return (
                                    <div className='section-customize' key={index}>
                                        <div className='customize-border'>
                                            <div className='author-background'>
                                                <div className='bg-img section-outstanding-doctor' style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                            </div>

                                            <div className='position text-center'>
                                                <div> {language === languages.VI ? nameVi : nameEn}</div>
                                                <div>Co xuong khop</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>

                </div>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctorRedux: state.admin.topDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fectTopDoctor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
