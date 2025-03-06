import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import "./ManageDoctor.scss";
import Select from 'react-select';
import { CRUD_ACTIONS, languages } from '../../../utils';
import { getDetailInforDoctor } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: ''
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.fetchRequireDoctorInfor()
    }
    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueVi;
                let labelEn = type === 'USERS' ? `${item.firstName} ${item.lastName}` : item.valueEn;
                object.label = language === languages.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object)
            })

        }
        return result;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {

            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor
            let dataSelectPrice = this.buildDataInputSelect(resPrice);
            let dataSelectPayment = this.buildDataInputSelect(resPayment);
            let dataSelectProvince = this.buildDataInputSelect(resProvince);
            // console.log('check redux', dataSelectPrice, dataSelectPayment, dataSelectProvince)
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince
            })
        }

    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
        console.log('handleEditorChange', html, text);
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let res = await getDetailInforDoctor(selectedOption.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }
        // console.log('check select doctor', res);
    };
    handleOnChangDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;

        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.EDIT
        })
    }
    render() {
        // console.log('check state save', this.state.listDoctors)
        const { selectedOption, hasOldData, selectedPrice, selectedPayment, selectedProvince } = this.state;
        return (

            <div className='manage-doctor-container'>
                <div className='manage-doctor-title mt-3'><FormattedMessage id='admin.manage-doctor.title' /></div>

                <div className='more-info'>
                    <div className='content-left'>
                        <label><FormattedMessage id='admin.manage-doctor.choose-doctor' /></label>
                        <Select
                            value={selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-doctor' />}
                        />
                    </div>
                    <div className='content-right form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.intro' /></label>
                        <textarea className='form-control' rows="5" onChange={(event) => this.handleOnChangDesc(event)} value={this.state.description}>
                        </textarea>
                    </div>

                </div>

                <div className='more-info-extra row'>
                    <div className='col-4 form-group'>
                        <label> <FormattedMessage id='admin.manage-doctor.choose-price' /></label>
                        <Select
                            // value={selectedPrice}
                            // onChange={this.handleChangeSelect}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-price' />}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.choose-payment' /></label>
                        <Select
                            // value={selectedPrice}
                            // onChange={this.handleChangeSelect}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-payment' />}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label> <FormattedMessage id='admin.manage-doctor.choose-province' /></label>
                        <Select
                            // value={selectedPrice}
                            // onChange={this.handleChangeSelect}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-province' />}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label> <FormattedMessage id='admin.manage-doctor.nameclinic' /></label>
                        <input className='form-control' />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.addressclinic' /></label>
                        <input className='form-control' />
                    </div>
                    <div className='col-4 form-group'>
                        <label> <FormattedMessage id='admin.manage-doctor.note' /></label>
                        <input className='form-control' />
                    </div>
                </div>

                <div className='manage-doctor-editor'>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>

                <button onClick={() => this.handleSaveContentMarkdown()} className={hasOldData === true ? 'update-content-doctor' : 'save-content-doctor'}>
                    {hasOldData === true ? <span><FormattedMessage id='admin.manage-doctor.update' /></span> : <span><FormattedMessage id='admin.manage-doctor.save' /></span>}
                </button>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        fetchRequireDoctorInfor: () => dispatch(actions.fetchRequireDoctorInfor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
