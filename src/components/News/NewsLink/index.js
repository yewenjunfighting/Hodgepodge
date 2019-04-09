import React, { Component } from 'react'

import './index.css'
class NewsLink extends Component {
    render() {
        return (
            <ul>
                {
                    this.props.title.map((value, index)=>{
                        return (
                            <li className="newsLink" key={index}>
                                <a href={this.props.link[index]} target="_blank" rel="noopener noreferrer">
                                    {
                                        value
                                    }
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

export default NewsLink;
