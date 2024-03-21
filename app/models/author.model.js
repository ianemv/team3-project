import mongoose from 'mongoose';

// Define Author schema
const authorSchema = new mongoose.Schema({
    authorId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    bio: String,
    birthDate: Date,
	
});

authorSchema.pre('save', function (next) {
    if (!this.isNew) {
        return next();
    }

    const generateAuthorId = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let authorId = '';
        for (let i = 0; i < 8; i++) {
            authorId += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return authorId;
    };

    this.authorId = generateAuthorId();
    next();
});

const Author = mongoose.model('Author', authorSchema);

export default Author