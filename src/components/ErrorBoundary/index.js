import React, {Component} from 'react'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            errorInfo: null
        }
    }

    componentDidCatch(error, errorInfo) {
        // 出现异常时，会被这个函数捕获
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }

    render() {
        const { error, errorInfo } =  this.state
        if(errorInfo) {
            return (
                <div>
                    <h2>Something went wrong</h2>
                    <details style={{whiteSpace: 'pre-wrap'}}>
                        {error && error.toString()}
                        <br />
                        {errorInfo.componentStack}
                    </details>
                </div>
            )
        }else {
            return this.props.children
        }
    }
}

export default ErrorBoundary
