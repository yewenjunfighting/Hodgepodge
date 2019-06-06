import React, { Component } from 'react'
import { chooseFile, haveAvatar } from '../../controllers/resume'

import './index.css'

class ResumeGenerator extends Component {
    componentDidMount() {
        // 如果用户之前上传过图像, 就显示之前的头像
        haveAvatar()
    }
    render() {
        return (
            <div className="resume">
                <form action="#">
                    <p className="form-item avatar">
                        <input type="file" className="chooseImage" onChange={ chooseFile }/>
                    </p>
                </form>
            </div>
        )
    }
}

export default ResumeGenerator ;
