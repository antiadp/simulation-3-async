module.exports = {
    isRegistered: (req, res) => {
        console.log('isRegistered endpt')
        if(req.user.first === null){
            res.redirect('http://localhost:3000/#/Profile')
        } else {
            res.redirect('http://localhost:3000/#/Dashboard')
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.status(200).send(req.session);
        console.log("session ended");
        (req, res) => {
            req.logOut();
            res.redirect('http://localhost:3000/#/Auth')
        }
    },
    // allUsers: (req, res) => {
    //     console.log('the profile off auth0', req.session.passport)
    //     // let { id } = req.user
    //     const db = req.app.get('db')
    //     db.get_all_users()
    //         .then(resp => {
    //             console.log('this is the res in ctrl', res)
    //             res.status(200).send(resp)
    //     })
    // },
    getRecommended: (req, res, next) => {
        const db = req.app.get('db')
        console.log('get rec friends endpt')

        if (req.user) {
            db.recommended_friends([req.user.id]).then(users => {
                console.log(users, 'recommended users')
                res.status(200).send(users)
            })
        }
    },
    addFriend: (req, res, next) => {
        const db = req.app.get('db');
        const { friendId } = req.body;

        db.add_friend(req.user.id, friendId).then(users => {
            console.log('friend added');
            res.status(200).send(users)
        }).catch(err => console.log('add-friend error', err))
    },

    deleteFriend: (req, res, next) => {
        const db = req.app.get('db');
        const { friendId } = req.body;

        db.remove_friend([req.user.id, friendId]).then(users => {
            res.status(200).send(users)
        })
    },
    getUser: (req, res, next) => {
        const db = req.app.get('db')
        db.find_user([req.user.id]).then(user => {
            res.status(200).send(user)
        })
    },
    updateUser: (req, res, next) => {
        const db = req.app.get('db')
        const { first, last, gender, hair_color, eye_color, hobby, bday_day, bday_month, bday_year } = req.body

        db.update_user([req.user.id, first, last, gender, hair_color, eye_color, hobby, bday_day, bday_month, bday_year])
            .then(user => res.status(200).send(user))
            .catch(err => console.log('update failed', err))
    },
    getProfileList: (req, res, next) => {
        const db = req.app.get('db')
        console.log('ctrl req.user in get profiles', req.body)

        db.get_profiles([req.user.id]).then(users => {
            console.log('got all the other user', users)
            res.status(200).send(users)
        })
    }
}