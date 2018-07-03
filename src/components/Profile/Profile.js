import React, { Component } from 'react';
import axios from 'axios';
import Nav from '../Nav/Nav';
import './profile.css';

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedUser: {},
            firstName: '',
            lastName: '',
            gender: '',
            hairColor: '',
            eyeColor: '',
            hobby: '',
            bDate: '',
            bMonth: '',
            bYear: ''
        }
        this.updateProfile = this.updateProfile.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        axios.get('/auth/authenticated').then(res => {
            this.setState({
                firstName: res.data.first,
                lastName: res.data.last,
                gender: res.data.gender,
                hairColor: res.data.hair_color,
                eyeColor: res.data.eye_color,
                hobby: res.data.hobby,
                bDate: res.data.bday_day,
                bMonth: res.data.bday_month,
                bYear: res.data.bday_year,
                loggedUser: res.data
            })
        }).catch(err => { 
            console.log('booting user', err)
            this.props.history.push('/') 
        })
    }

    updateProfile() {
        const { firstName, lastName, gender, hairColor, eyeColor, hobby, bDate, bMonth, bYear } = this.state;
        console.log(this.state)
        axios.put('/api/profile/update', {
            firstName,
            lastName,
            gender,
            hairColor,
            eyeColor,
            hobby,
            bDate,
            bMonth,
            bYear

        }).then(res => {
            this.setState({

                userInfo: res.data[0],
                firstName: res.data.first,
                lastName: res.data.last,
                gender: res.data.gender,
                hairColor: res.data.hair_color,
                eyeColor: res.data.eye_color,
                hobby: res.data.hobby,
                bDate: res.data.bday_day,
                bMonth: res.data.bday_month,
                bYear: res.data.bday_year
            })
            this.props.history.push('/Dashboard')
        })
    }

    // handleChange val, val2 setup in controller
    handleChange(uProp, val) {
        this.setState({ [uProp]: val })
    }
    cancel() {
        const { loggedUser } = this.state;
        const { first, last, gender, hair_color, eye_color, hobby, bday_date, bday_month, bday_year } = loggedUser;

        this.setState({

            firstName: first || '',
            lastName: last || '',
            gender: gender || '',
            hairColor: hair_color || '',
            eyeColor: eye_color || '',
            hobby: hobby || '',
            bDate: bday_date || '',
            bMonth: bday_month || '',
            bYear: bday_year || ''
        })
        this.props.history.push('/Dashboard')
    }

    render() {
        console.log(this.state.loggedUser, 'profile info')
        return (
            <div >
                <Nav page='Profile' />
                <div className='profile_parent'>
                    <div className='profile_child'>
                        <div className='profile_usr_top content-container'>
                            <img src={this.state.loggedUser.img} className='profile_img' alt='profile_pic' />
                            <div className='usernamebox open-sans-bold'>
                                {this.state.loggedUser.auth_id
                                    ?
                                    <span className='name'> {this.state.loggedUser.first}
                                        {this.state.loggedUser.last} </span>
                                    :
                                    null}
                            </div>
                            <div className='usr_btns'>
                                <button 
                                    className='profile_btn black-btn' 
                                    onClick={() => { this.updateProfile() }} >
                                    Update
                                </button>
                                <button 
                                    className='profile_btn grey-btn' 
                                    onClick={() => { this.cancel() }}>
                                    Cancel
                                </button>
                            </div>
                        </div>

                        <div className='profile_bottom content-container'>
                            <div className='profile_bottom_child'>
                                <span className='name_span open-sans' > First Name </span>
                                <input value={this.state.firstName} 
                                    className='input' 
                                    onChange={(e) => this.handleChange(e.target.value, 'firstName')} />
                                <span className='name_span open-sans' > 
                                    Last Name 
                                </span>
                                <input value={this.state.lastName} 
                                    className='input' 
                                    onChange={(e) => this.handleChange(e.target.value, 'lastName')} />

                                <span className='open-sans'> Gender </span>
                                <select value={this.state.gender} 
                                    className='select' 
                                    onChange={(e) => this.handleChange(e.target.value, 'gender')}>
                                    <option disabled=''> -- Select -- </option>
                                    <option value='Male' > Male </option>
                                    <option value='Female'> Female </option>
                                </select>
                                <span className='open-sans'> Hair Color </span>
                                <select value={this.state.hairColor} 
                                    className='select' 
                                    onChange={(e) => this.handleChange(e.target.value, 'hairColor')}>
                                    <option disabled=''> -- Select -- </option>
                                    <option value='Bald'> Bald </option>
                                    <option value='Brown'> Brown </option>
                                    <option value='Blond'> Blond </option>
                                    <option value='Black'> Black </option>
                                    <option value='Red'> Red </option>
                                </select>
                                <br />
                                <span className='open-sans'> Eye Color </span>
                                <select value={this.state.eyeColor} 
                                    className='select' 
                                    onChange={(e) => this.handleChange(e.target.value, 'eyeColor')}>
                                    <option disabled=''> -- Select -- </option>
                                    <option value='Blue'> Blue  </option>
                                    <option value='Green'> Green </option>
                                    <option value='Brown'> Brown </option>
                                    <option value='Hazel'> Hazel </option>
                                </select >
                                <span className='open-sans' > Hobby </span>
                                <select value={this.state.hobby} 
                                    className='select' 
                                    onChange={(e) => this.handleChange(e.target.value, 'hobby')}>
                                    <option disabled=''> -- Select -- </option>
                                    <option value='Sports'> Sports </option>
                                    <option value='Crying'> Crying </option>
                                    <option value='Coding'> Coding </option>
                                    <option value='Educating'> Educating </option>
                                </select>
                                <br />
                                <span className='open-sans'> Birth Date </span>
                                <select value={this.state.bDate} 
                                    className='select' 
                                    onChange={(e) => this.handleChange(e.target.value, 'bDate')}>
                                    <option disabled=''> -- Select -- </option>
                                    <option value='1'> 01 </option>
                                    <option value='2'> 02 </option>
                                    <option value='3'> 03 </option>
                                    <option value='4'> 04 </option>
                                    <option value='5'> 05 </option>
                                    <option value='6'> 06 </option>
                                    <option value='7'> 07 </option>
                                    <option value='8'> 08 </option>
                                    <option value='9'> 09 </option>
                                    <option value='10'> 10 </option>
                                    <option value='11'> 11 </option>
                                    <option value='12'> 12 </option>
                                    <option value='13'> 13 </option>
                                    <option value='14'> 14 </option>
                                    <option value='15'> 15 </option>
                                    <option value='16'> 16 </option>
                                    <option value='17'> 17 </option>
                                    <option value='18'> 18 </option>
                                    <option value='19'> 19 </option>
                                    <option value='20'> 20 </option>
                                    <option value='21'> 21 </option>
                                    <option value='22'> 22 </option>
                                    <option value='23'> 23 </option>
                                    <option value='24'> 24 </option>
                                    <option value='25'> 25 </option>
                                    <option value='26'> 26 </option>
                                    <option value='27'> 27 </option>
                                    <option value='28'> 28 </option>
                                    <option value='29'> 29 </option>
                                    <option value='30'> 30 </option>
                                    <option value='31'> 31 </option>
                                </select>
                                <span className='open-sans'> Birth Month </span>
                                <select value={this.state.bMonth} 
                                    className='select' 
                                    onChange={(e) => this.handleChange(e.target.value, 'bMonth')}>
                                    <option disabled=''> -- Select -- </option>
                                    <option value='January'> January </option>
                                    <option value='February'> February </option>
                                    <option value='March'> March </option>
                                    <option value='April'> April </option>
                                    <option value='May'> May </option>
                                    <option value='June'> June </option>
                                    <option value='July'> July </option>
                                    <option value='August'> August </option>
                                    <option value='September'> September </option>
                                    <option value='October'> October </option>
                                    <option value='November'> November </option>
                                    <option value='December'> December </option>
                                </select>
                                <span className='open-sans'> Birth Year </span>
                                <select value={this.state.bYear} 
                                    className='select' 
                                    onChange={(e) => this.handleChange(e.target.value, 'bYear')}>
                                    <option disabled=''> -- Select -- </option>
                                    <option value="2000"> 2000 </option>
                                    <option value="1999"> 1999 </option>
                                    <option value="1998"> 1998 </option>
                                    <option value="1997"> 1997 </option>
                                    <option value="1996"> 1996 </option>
                                    <option value="1995"> 1995 </option>
                                    <option value="1994"> 1994 </option>
                                    <option value="1993"> 1993 </option>
                                    <option value="1992"> 1992 </option>
                                    <option value="1991"> 1991 </option>
                                    <option value="1990"> 1990 </option>
                                    <option value="1989"> 1989 </option>
                                    <option value="1988"> 1988 </option>
                                    <option value="1987"> 1987 </option>
                                    <option value="1986"> 1986 </option>
                                    <option value="1985"> 1985 </option>
                                    <option value="1984"> 1984 </option>
                                    <option value="1983"> 1983 </option>
                                    <option value="1982"> 1982 </option>
                                    <option value="1981"> 1981 </option>
                                    <option value="1980"> 1980 </option>
                                    <option value="1979"> 1979 </option>
                                    <option value="1978"> 1978 </option>
                                    <option value="1977"> 1977 </option>
                                    <option value="1976"> 1976 </option>
                                    <option value="1975"> 1975 </option>
                                    <option value="1974"> 1974 </option>
                                    <option value="1973"> 1973 </option>
                                    <option value="1972"> 1972 </option>
                                    <option value="1971"> 1971 </option>
                                    <option value="1970"> 1970 </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
