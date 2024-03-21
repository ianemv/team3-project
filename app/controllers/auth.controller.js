import User from "../models/user.model.js"

const signin = async (req, res) => {

    try {
        let user = User.findOne()
        return res.json(user)
    }
    catch (err) {
        return res.status('401').json({error: 'Login error'})
    }
}

const signout = async (req, res) => {
    return res.status(200).json({msg: "Signed out"})
}

const signup = async(req, res) => {
    return res.status(200).json({msg: "sign up successful", body: req.body})
}

export default {
    signin,
    signout,
    signup
}