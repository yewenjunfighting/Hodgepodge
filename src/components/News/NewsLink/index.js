import React, { Component, Children } from 'react'

import './index.css'
class NewsLink extends Component {
    componentDidMount() {
        console.log([1,2,3].map(val=>[val]))
        let res = Children.map([1, 2, 3], (val)=>[val])
        console.log(res)
    }
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
