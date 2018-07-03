import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import './Nav.css'

import HomeBtn from '../../Assets/home.png'
import SearchBtn from '../../Assets/search.png'
// import Logout from '../../Assets/logout.png'


class Header extends Component {

    logout = () => {
        console.log('logging out')
        axios.post("/auth/logout")
        .then(res => {
            this.props.history.push('/')
        });
    }
    
    render(){
        return(
            
            <div className='nav-main'>
                <div className='nav-content'>
                    <div className='left-content'>
                        Helo
                        <Link to='/Dashboard'>
                        <img src={HomeBtn} alt='helo logo'/>
                        </Link>
                        <Link to='/Search'>
                        <img src={SearchBtn} alt='search glass'/>
                        </Link>
                    </div>
                    <div className='middle-content'>
                        <h5>{this.props.page}</h5> 
                    </div>
                    <div className='right-content'>
                        <span 
                            className="link" 
                            onClick={e => this.logout()}>
                            Logout 
                        </span>
                    </div>
                </div>
               
            </div>
            
        )
    }
}

export default withRouter(Header)