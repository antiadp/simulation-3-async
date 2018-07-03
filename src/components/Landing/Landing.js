import React from 'react';
import './Landing.css';
import Logo from '../../Assets/logo.png';
// import {Link} from 'react-router-dom'
// import Dashboard from '../Dashboard/Dashboard';

// import axios from 'axios'


export default function Landing() {
    // Test logout logic
    // axios.get('/auth/authenticated').then(res => {
    //     console.log('You are still logged in:', res.data)
    // }).catch(err => {
    //     console.log('You are not logged in')
    // })
    
    return (
        <div className='main-landing' >
            <div className='login-container' >
                <div className='content-container' >
                    <img 
                    className= 'logo-bin'
                    src={Logo} 
                    alt='helo logo'
                    />
                    <h1
                        className='company-name'>
                            Helo
                    </h1>
                </div>
                    
                    <a href={process.env.REACT_APP_LOGIN}>
                    <button 
                        className="auth0-button" 
                        >
                            Login / Register
                    </button>
                    </a>
                    
            </div>  
        </div>
    )
}