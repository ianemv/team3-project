import User from "../models/user.model.js"

const signin = async (req, res) => {
    // let User = User;
    try {
        let user = {
            email : "test@test.com"
        }
        return res.json(user)
    }
    catch (err) {
        return res.status('401').json({error: 'Sign In error'})
    }
}

export default {
    signin
}