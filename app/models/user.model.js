import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    user_id: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String
    }
})

export default mongoose.model('User', UserSchema);