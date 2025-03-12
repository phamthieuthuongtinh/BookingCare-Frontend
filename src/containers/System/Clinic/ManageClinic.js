import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageClinic.scss';
import { CommonUtils, languages } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { createNewClinic } from '../../../services/userService';
import { toast } from 'react-toastify';
const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: ''
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
        // console.log('handleEditorChange', html, text);
    }
    handleOnchangeInput = (event, id) => {
        let cpState = {
            ...this.state
        }
        cpState[id] = event.target.value;
        this.setState({
            ...cpState
        })
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            })
        }
    }
    handleSaveNewClinic = async () => {
        let res = await createNewClinic(this.state);
        if (res && res.errCode === 0) {
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                address: ''
            })
            toast.success('Save infor clinic succeed');

        }
        else {
            toast.error('Save infor clinic failed');
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className='manage-clinic-container'>
                    <div className='ms-title'>Quản lý phòng khám</div>

                    <div className='add-new-clinic row'>
                        <div className='col-6 form-group'>
                            <label>Tên phòng khám</label>
                            <input className='form-control' type='text' value={this.state.name}
                                onChange={(event) => this.handleOnchangeInput(event, 'name')}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Ảnh phòng khám</label>
                            <input className='form-control-file' type='file'
                                onChange={(event) => this.handleOnChangeImage(event)} />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Địa chỉ</label>
                            <input className='form-control' type='text' value={this.state.address}
                                onChange={(event) => this.handleOnchangeInput(event, 'address')}
                            />
                        </div>
                        <div className='col-12'>
                            <MdEditor
                                style={{ height: '300px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkdown}
                            />
                        </div>
                        <div className='col-12'>
                            <button className='btn-save-clinic'
                                onClick={() => this.handleSaveNewClinic()}
                            >Lưu</button>
                        </div>

                    </div>
                </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
