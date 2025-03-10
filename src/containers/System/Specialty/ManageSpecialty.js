import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSpecialty.scss';
import { CommonUtils, languages } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { createNewSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';
const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
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
    handleSaveNewSpecialty = async () => {
        let res = await createNewSpecialty(this.state);
        if (res && res.errCode === 0) {
            toast.success('Save infor specialty succeed');
        }
        else {
            toast.error('Save infor specialty failed');
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className='manage-specialty-container'>
                    <div className='ms-title'>Quản lý chuyên khoa</div>

                    <div className='add-new-specialty row'>
                        <div className='col-6 form-group'>
                            <label>Ten chuyen khoa</label>
                            <input className='form-control' type='text' value={this.state.name}
                                onChange={(event) => this.handleOnchangeInput(event, 'name')}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Anh chuyen khoa</label>
                            <input className='form-control-file' type='file'
                                onChange={(event) => this.handleOnChangeImage(event)} />
                        </div>
                        <div className='col-12'>
                            <MdEditor
                                style={{ height: '300px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.contentMarkdown}
                            />
                        </div>
                        <div className='col-12'>
                            <button className='btn-save-specialty'
                                onClick={() => this.handleSaveNewSpecialty()}
                            >Save</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
