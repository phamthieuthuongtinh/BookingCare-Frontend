import React, { Component } from 'react';
import Slider from "react-slick";
import { connect } from 'react-redux';
// import "./OutStandingDoctor.scss";


class OutStandingDoctor extends Component {

    render() {
        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Bác sĩ nổi bật tuần qua</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>

                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='author-background'>
                                        <div className='bg-img section-outstanding-doctor'></div>
                                    </div>

                                    <div className='position text-center'>
                                        <div>Tinh Pham</div>
                                        <div>Co xuong khop</div>
                                    </div>
                                </div>


                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='author-background'>
                                        <div className='bg-img section-outstanding-doctor'></div>
                                    </div>

                                    <div className='position text-center'>
                                        <div>Tinh Pham</div>
                                        <div>Co xuong khop</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='author-background'>
                                        <div className='bg-img section-outstanding-doctor'></div>
                                    </div>

                                    <div className='position text-center'>
                                        <div>Tinh Pham</div>
                                        <div>Co xuong khop 1</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='author-background'>
                                        <div className='bg-img section-outstanding-doctor'></div>
                                    </div>

                                    <div className='position text-center'>
                                        <div>Tinh Pham</div>
                                        <div>Co xuong khop 2</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='author-background'>
                                        <div className='bg-img section-outstanding-doctor'></div>
                                    </div>

                                    <div className='position text-center'>
                                        <div>Tinh Pham</div>
                                        <div>Co xuong khop 3</div>
                                    </div>

                                </div>
                            </div>
                            <div className='section-customize' >
                                <div className='customize-border'>
                                    <div className='author-background'>
                                        <div className='bg-img section-outstanding-doctor'></div>
                                    </div>

                                    <div className='position text-center'>
                                        <div>Tinh Pham</div>
                                        <div>Co xuong khop 4</div>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>

                </div>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
