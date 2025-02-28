import React, { Component } from 'react';
import { connect } from 'react-redux';
class About extends Component {
    render() {

        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Hãy nghe về tôi
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="90%" height="400"
                            src="https://www.youtube.com/embed/rqB2Ws_ioAs" title="Full List Style Huy PT - Mở Lối Cho Em x Mỹ Nhân Ơi x Nắng Ấm Xa Dần x No More Goodbye VH Remix" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>

                        </iframe>
                    </div>
                    <div className='content-right'>
                        <p>  Tôi là sinh viên mới ra trường, tôi tìm kiếm môi trường học tập,
                            rèn luyện và phát triển bản thân, cùng phát triển và đạt được định hướng tương lai.</p>

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

export default connect(mapStateToProps, mapDispatchToProps)(About);
