import React, { Component } from 'react'
import { chooseFile } from '../../controllers/resume'

import './index.css'

class ResumeGenerator extends Component {
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
