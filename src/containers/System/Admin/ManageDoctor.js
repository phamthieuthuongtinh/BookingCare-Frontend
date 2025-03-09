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
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === languages.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object)
                })
            }
            if (type === "PRICE") {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label = language === languages.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if (type === "PAYMENT" || type === "PROVINCE") {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;
                    object.label = language === languages.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }

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
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor
            let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
            let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
            let dataSelectProvince = this.buildDataInputSelect(resProvince, "PROVINCE");
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince
            })
        }
        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {

            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor
            let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
            let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
            let dataSelectProvince = this.buildDataInputSelect(resProvince, "PROVINCE");
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
        // console.log('handleEditorChange', html, text);
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let { listPayment, listPrice, listProvince } = this.state;
        let res = await getDetailInforDoctor(selectedOption.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            let addressClinic = '', nameClinic = '', note = '', paymentId = '', priceId = '', provinceId = '';

            let selectedPayment = '', selectedPrice = '', selectedProvince = '';

            if (res.data.Doctor_Infor) {
                addressClinic = res.data.Doctor_Infor.addressClinic;
                nameClinic = res.data.Doctor_Infor.nameClinic;
                note = res.data.Doctor_Infor.note;
                paymentId = res.data.Doctor_Infor.paymentId;
                priceId = res.data.Doctor_Infor.priceId;
                provinceId = res.data.Doctor_Infor.provinceId;
                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
                // console.log('check find iten', selectedPayment, selectedPrice, selectedProvince);
            }



            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince


            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: ''
            })
        }
        // console.log('check select doctor', res);
    };
    handleOnChangeText = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }
    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;

        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note
        })
    }
    handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        })
        console.log('check select:', selectedOption, stateName)
    }
    render() {

        const { selectedOption, hasOldData, selectedPrice, selectedPayment, selectedProvince } = this.state;
        console.log('check state save', this.state)
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
                        <textarea className='form-control' rows="5"
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}>
                        </textarea>
                    </div>

                </div>

                <div className='more-info-extra row'>
                    <div className='col-4 form-group'>
                        <label> <FormattedMessage id='admin.manage-doctor.choose-price' /></label>
                        <Select
                            value={selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-price' />}
                            name="selectedPrice"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.choose-payment' /></label>
                        <Select
                            value={selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-payment' />}
                            name="selectedPayment"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label> <FormattedMessage id='admin.manage-doctor.choose-province' /></label>
                        <Select
                            value={selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-province' />}
                            name="selectedProvince"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label> <FormattedMessage id='admin.manage-doctor.nameclinic' /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.addressclinic' /></label>
                        <input className='form-control'

                            onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label> <FormattedMessage id='admin.manage-doctor.note' /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={this.state.note}
                        />
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
