import React, { Component } from 'react';
import { changeLanImgSize } from "../../../api/news";
import './index.css'
class Lantern extends Component {
    constructor(props){
        super(props)
        this.State = {
            img: []
        }
    }

    componentDidMount() {
        window.onresize = changeLanImgSize
        changeLanImgSize()
    }

    componentWillUpdate(nextProps) {

    }

    componentWillUnmount() {
        console.log('卸载')
    }

    render() {
        return (
            <div id="lan"><img className="lanImg"src="https://api.dujin.org/pic/" alt="动漫"/></div>
        )
    }
}

export default Lantern;
