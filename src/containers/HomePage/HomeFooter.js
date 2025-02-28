import React, { Component } from 'react';
import { connect } from 'react-redux';
class HomeFooter extends Component {
    render() {

        return (
            <div className=' home-footer'>
                <h4> &copy; 2025 TinhPham with React. More information, please visit <a href='https://github.com/phamthieuthuongtinh' target='_blank'>my Github</a></h4>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
