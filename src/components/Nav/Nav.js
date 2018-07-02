import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Nav.css'

import HomeBtn from '../../Assets/home.png'
import SearchBtn from '../../Assets/search.png'
// import Logout from '../../Assets/logout.png'

export default class Header extends Component {

    logout = () => {
        axios.post("/logout");
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
                        <h5>{this.props.title}</h5> 
                    </div>
                    <div className='right-content'>
                        <Link 
                            className="link" 
                            to="/" 
                            onClick={e => this.logout()}>
                            Logout 
                        </Link>
                    </div>
                </div>
               
            </div>
            
        )
    }
}