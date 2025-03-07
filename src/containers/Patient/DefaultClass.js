import React, { Component } from 'react';
import { connect } from "react-redux";
import './DefaultClass.scss';
import { languages } from '../../../utils';
import { FormattedMessage } from 'react-intl';

class DefaultClass extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    render() {
        return (
            <React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
