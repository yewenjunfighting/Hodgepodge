import React, { Component, Fragment, Suspense }from 'react'

import './index.css'
import { DetailPage } from '../../PageTitle'

class PicDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picUrl: sessionStorage.getItem('picUrl')
        }
    }
    render() {
        const picUrl = this.state.picUrl
        return (
            <Fragment>
                <Suspense fallback={<div>Loading...</div>}>
                    <DetailPage />
                    <div className="picDiv">
                        <img src={picUrl} alt="美图" className="picDetail"/>
                    </div>
                </Suspense>
            </Fragment>
        )
    }
}

export default PicDetail
