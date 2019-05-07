import React, { Component } from "react";
import imagesLoaded from "imagesloaded";
import Masonry from "masonry-layout";

import './index.css'

class PicItem extends Component{

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.picUrl === this.props.picUrl)
            return false
        else return true
    }

    componentDidMount() {
        let imgLoad = imagesLoaded('.grid-item')
        imgLoad.on('done', function(instance) {
            let grid = document.querySelector('.grid')
            let msnry = new Masonry(grid, {
                itemSelector: '.grid-item',
                columnWidth: '.grid-sizer',
                percentPosition: true
            });
        })

        imgLoad.on('fail', function( instance ) {
            console.log('all images loaded, at least one is broken')
        })

        imgLoad.on('progress', (instance, image) =>{
            if(!image.isLoaded){
                // this.props.deletePic(image.img.currentSrc)
            }
        })
    }

    toDetail(event) {
        const node = event.target
        event.preventDefault()
        sessionStorage.setItem('picUrl', node.src)
        window.open('/pic/picDetail', "_blank")
    }

    render() {
        const picUrl = this.props.picUrl;
        const toDetail = this.toDetail
        return (
            <div className="grid-item">
                <a href="/pic/picDetail" onClick={toDetail} >
                    <img src={picUrl} alt="壁纸" />
                </a>
            </div>
        )
    }
}

export default PicItem;
