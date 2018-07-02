import React, { Component } from 'react';
import Nav from '../Nav/Nav'
import './Dashboard.css'

import { Link } from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux';
import {getUser} from '../../ducks/Reducer'

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // fName: this.req.session.passport.user.first,
            // lName: this.req.session.passport.user.last
            loggedUser: {},
            recFriends: [],
            sort: ''
        }
    }
    componentDidMount() {
        // getUser()
        axios.get('/auth/authenticated').then(user => {
            console.log('dashboard auth user', user)
            this.setState({ loggedUser: user.data })
        })
        axios.get('/api/recommended').then(res => {
            console.log('where rec friends back from db')
            this.setState({
                recFriends: res.data
            })
        }).catch(err => {
            console.log('cant auth user', err)
        })
    }

    addFriend(friendId) {
        axios.post('/api/friend/add', { friendId }).then(res => {
            axios.get('/api/recommended').then(res => {
                this.setState({ recFriends: res.data })
            })
        })
    }    
    render() {
        console.log('state loggedUser', this.props)
        const { loggedUser, sort, recFriends } = this.state
        const recommendedFiltered = recFriends.filter(e => {
            if (sort === 'first') {
                return e.first === loggedUser.first
            } if (sort === 'last') {
                return e.last === loggedUser.last
            } if (sort === "hobby") {
                return e.hobby === loggedUser.hobby
            } if (sort === 'gender') {
                return e.gender === loggedUser.gender
            } if (sort === 'hair') {
                return e.hair_color === loggedUser.hair_color
            } if (sort === 'eye') {
                return e.eye_color === loggedUser.eye_color
            } if (sort === '') {
                return loggedUser;
            } 
        })

        const listedBots = recommendedFiltered.map((user, i) => {
            //console.log(user)
            return (

                <div key={i} className='rec_content content-container'>
                    <div className='rec_left'>
                        <img width='100px' src={user.img} alt='profile' />
                    </div>
                    <div className='friend_name open-sans-bold'>
                        <h3>{user.first}</h3>
                        <h3>{user.last}</h3>
                    </div>
                    <button className='add_btn orange-btn' onClick={() => this.addFriend(user.id)}> Add Friend </button>
                </div>
            )
        })


        return (
            <div>
                <Nav page='Dashboard' />
                <div className='dash_parent_container'>
                    <div className='dash_child_container'>
                        <div className='dash_child_top'>
                            <div className='user_box'>
                                <span className='user_left'>
                                    {loggedUser.id ? <img src={this.state.loggedUser.img} className='user_image' alt='profile' /> : null}
                                </span>
                                <span className='user_right'>
                                    {loggedUser.id ? <span className='usr_first open-sans-bold'> {loggedUser.first} </span> : null}
                                    {loggedUser. id ? <span className='usr_last open-sans-bold'> {loggedUser.last} </span> : null}
                                    <Link to='/Profile'><button className='edit_button grey-btn open-sans'>Edit Profile</button></Link>
                                </span>
                            </div>
                            <div className='dash_board content-container'>
                                <span className='open-sans'>Welcome to Helo! Find recommended friends based on your similarities, and even search for them by name. The more you update your profile, the better recommendations we can make!</span>
                            </div>
                        </div>
                        <div className='dash_recommend_parent'>
                            <div className='dash_recommend_child content-container'>
                                <div className='dash_recommend_header'>
                                    <span className='recommend_span_h open-sans'>Recommended Friends</span>
                                    <span className='recommend_span_s open-sans'>Sorted by</span>
                                    <select className='dash_select open-sans' onChange={(e) => this.setState({ sort: e.target.value })} >
                                        <option value={''}>------------</option>
                                        <option value='first'> First Name </option>
                                        <option value='last'> Last Name </option>
                                        <option value='gender'> Gender </option>
                                        <option value='hobby'> Hobby </option>
                                        <option value='hair_color'> Hair Color </option>
                                        <option value='eye_color'> Eye Color </option>
                                        <option value='birthday'> Birthday </option>
                                    </select>
                                </div>

                                <div className='dash_rec_usr_p'>
                                    <div className='dash_rec_usr_c'>
                                        {listedBots}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
function mapStateToProps(state) {
    return {state: state.user}
}

export default connect(mapStateToProps, {getUser})(Dashboard);