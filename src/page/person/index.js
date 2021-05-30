import React, { Component,useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'

import axios from 'axios'
// import * as action from './store/actionCreator'

class Person extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:''
        }
    }
    render() {
        return (
            <>{this.state.id}</>
        )
    }
    componentDidMount() {
        this.setState({
            id:this.props.match.params.id
        })
    }
}

const mapStateToProps = (state)=> ({
    
})
const mapDispatchToProps = (dispatch)=> ({
    
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Person))