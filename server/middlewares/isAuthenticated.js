module.exports = function(req, res, next) {
    console.log('req from isAuth', req.body)
    if(req.session.passport.user.id){
        res.status(200).send()
        console.log('login success')
        next();
    } else {
        console.log('login fail')
        res.status(403).send()
    }
}

// module.exports = function(req, res, next) {
//     console.log('res from isAuth', req.body)
//     if(req.session.user.id){
//         res.status(200).send()
//         console.log('login success')
//     } else {
//         console.log('login fail')
//         res.status(403).send()
//     }
//     next();
// }