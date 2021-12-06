const User = require('../schemas/User')

const checkAdmin = async (req, res, next) => {
    const id = req.cookies.userId
    const user = await User.findById(id)
    if(user.isAdmin) return next()
    else return res.redirect('/')
}

module.exports = checkAdmin