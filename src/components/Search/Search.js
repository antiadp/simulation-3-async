import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import './search.css';

import axios from 'axios';


class Search extends Component {
    constructor() {
        super()

        this.state = {
            currentPage: 1,
            usersPerPage: 10,
            friendMates: true,
            search: '',
            inputValue: '',
            searchOption: '',
            searchResults: 'blank',
            userData: [],
            allProfiles: []
        }
        this.handlePageClick = this.handlePageClick.bind(this);
        this.reset = this.reset.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.selectedOption = this.selectedOption.bind(this);
        this.handleSearchButton = this.handleSearchButton.bind(this);
        this.addFriend = this.addFriend.bind(this);
    }

    // getting auth user, 1 logged in user and friend matches
    componentWillMount() {
        axios.get('/auth/authenticated').then(user => {
            this.setState({
                userData: user.data
            })
        }).catch(response => {
            console.log('cannot load search')
        })

        axios.get('/api/getUser').then(res => {
            this.setState({
                friendMates: res.data[0].id
            })
        })


        // every profile excluding current user
        axios.get('/api/profile/list').then(res => {
            let profileList = res.data
            this.setState({
                allProfiles: profileList
            })
        })

    }
    handlePageClick(e) {
        this.setState({
            currentPage: Number(e.target.id)
        })
    }

    reset() {
        this.setState({
            searchResults: 'blank',
            inputValue: ''
        })
    }

    // search results based on what is entered to input box
    handleInput(nameSearch) {
        let results = nameSearch.toUpperCase();
        this.setState({
            inputValue: results
        })
    }

    selectedOption(firstOrLast) {
        this.setState({
            search: firstOrLast.target.value
        })
    }


    handleSearchButton(searchOption) {
        let results = searchOption.toUpperCase()
        this.setState({
            searchResults: results
        })
    }

    addFriend(friendId) {
        axios.post('/api/friend/add', { friendId }).then(res => {
            axios.get('/api/profile/list').then(res => {
                this.setState({ allProfiles: res.data })
            })
        }).catch(response => {
            console.log('no friend 4 u')
        })
    }

    removeFriend(friendId) {

        axios.post('/api/friend/remove', { friendId }).then(res => {
            axios.get('/api/profile/list').then(res => {
                this.setState({ allProfiles: res.data })
            })
        }).catch(response => {
            console.log('friends forever sorry')
        })
    }

    render() {
        let { allProfiles, currentPage, usersPerPage } = this.state;

        let indexOfLastUser = currentPage * usersPerPage;
        let indexOfFirstUser = indexOfLastUser - usersPerPage;
        let profiles = allProfiles.slice(indexOfFirstUser, indexOfLastUser);
        let profilesMap = profiles.map((users, index) => {
            //console.log(users)
            if (this.state.searchResults === 'blank') {
                return (
                    <div key={index} className='profile_content content-container'>
                        <div className='list_left'>
                            <img src={`${users.img}`} width='100px' alt='profile' />
                        </div>

                        <div className='profile_name'>
                            {users.first}
                            <br />
                            {users.last}
                        </div>
                        {this.state.friendMates === users.user_id ?
                            <button onClick={() => { this.removeFriend(users.id) }} className='add_btn black-btn'>Remove Friend</button> :
                            <button onClick={() => { this.addFriend(users.id) }} className='add_btn orange-btn'>Add Friend</button>
                        }
                    </div>
                )
            }
            //searches by first name
            if (users.first.toLowerCase() === this.state.searchResults && this.state.search === 'first') {
                return (
                    <div key={index} className='profile_content content-container'>
                        <img src={`${users.img}`} width='100px' alt='profile' />
                        <div classNames='profile_name'>
                            {users.first}
                            <br />
                            {users.last}
                        </div>
                        {this.state.friendMates === users.user_id ?
                            <button onClick={() => { this.removeFriend(users.id) }} className='add_btn black-btn'>Remove Friend</button> :
                            <button onClick={() => { this.addFriend(users.id) }} className='add_btn orange-btn'>Add Friend</button>
                        }
                    </div>
                )
            }

            //searches by last name
            if (users.last.toLowerCase() === this.state.searchResults && this.state.search === 'last') {
                return (
                    <div key={index} className='profile_content content-container'>
                        <img src={`${users.img}`} width='100px' alt='profile' />
                        <div classNames='names'>
                            {users.first}
                            <br />
                            {users.last}
                        </div>
                        {this.state.friendMates === users.user_id ?
                            <button onClick={() => { this.removeFriend(users.id) }} className='add_btn orange-btn'>Remove Friend</button> :
                            <button onClick={() => { this.addFriend(users.id) }} className='add_btn orange-btn'>Add Friend</button>
                        }
                    </div>
                )
            }
        })

        let pageNumbers = [];

        for (let i = 1; i <= Math.ceil(allProfiles.length / usersPerPage); i++) {
            pageNumbers.push(i)
        }

        const showPages = pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handlePageClick}
                >
                    {number}
                </li>
            )
        })

        return (

            <div className='search_container'>
                <Nav page='Search' />
                <div className='search_parent'>
                    <div className='search_child content-container'>
                        <div className='child_top'>
                            <select onChange={this.selectedOption} className='select open-sans'>
                                <option value={''}> SELECT </option>
                                <option value='first'>First Name</option>
                                <option value='last'>Last Name</option>
                            </select>
                            <input onChange={(e) => { this.handleInput(e.target.value) }} className='input open-sans' />
                            <button className='search grey-btn' onClick={() => this.handleSearchButton(this.state.inputValue)}> Search </button>
                            <button onClick={() => { this.reset() }} className='complete black-btn'> Reset </button>
                        </div>

                        <div className='child_bottom'>
                            {profilesMap}
                        </div>
                        <div className='pages_div'>
                            <div className='numbers_div'>
                                {showPages}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Search;