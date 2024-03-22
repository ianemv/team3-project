import mongoose from 'mongoose';

// Define Author schema
const authorSchema = new mongoose.Schema({
    authorId: String,
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

authorSchema.pre('save', async function (next) {
    // Check if authorId already exists
    if (!this.authorId) {
        const generateAuthorId = () => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let authorId = '';
            for (let i = 0; i < 8; i++) {
                authorId += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return authorId;
        };

        let newAuthorId;
        let isUnique = false;
        // Generate unique authorId
        while (!isUnique) {
            newAuthorId = generateAuthorId();
            const existingAuthor = await this.constructor.findOne({ authorId: newAuthorId });
            if (!existingAuthor) {
                isUnique = true;
            }
        }
        this.authorId = newAuthorId;
    }
    next();
});

const Author = mongoose.model('Author', authorSchema, 'Authors');

export default Author;
