import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss'
import { getAllSpecialty } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
// import specialtyImg from "../../../assets/specialty/custom1.png";
import Slider from 'react-slick';
import { withRouter } from 'react-router';

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []
        }
    }
    async componentDidMount() {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data
            })
        }
    }
    handleViewDetailSpecialty = (specialty) => {
        // console.log('check view info', specialty);
        this.props.history.push(`/detail-specialty/${specialty.id}`)

    }
    render() {
        let { dataSpecialty } = this.state;
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id='homepage.specialties' /></span>
                        <button className='btn-section'><FormattedMessage id='homepage.see-more' /></button>
                    </div>

                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataSpecialty && dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {

                                    return (
                                        <div className='section-customize specialty-child' key={index}
                                            onClick={() => this.handleViewDetailSpecialty(item)}
                                        >
                                            <div style={{ backgroundImage: `url(${item.image})` }} className='bg-img section-specialty'></div>

                                            <div className='specialty-name'>{item.name}</div>
                                        </div>
                                    )
                                })
                            }


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
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
