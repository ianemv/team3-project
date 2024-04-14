import mongoose from 'mongoose';

// Define Book schema
const bookSchema = new mongoose.Schema({
    bookId: {
        type: String,
        auto: true,
    },
    title: {
        type: String,
        required: 'Book title is required'
    },
    author: {
        type: String,
        required: 'Book author is required'
    },
    ISBN: {
        type: String,
        default: '0'.repeat(13)
    },
    genre: {
        type: String,
        default: 'General'
    },
    publication_year: {
        type: Date,
        
    },
    quantity_available: {
        type: Number,
        default: 1
    },
    available: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        default: "available"
    }   ,
    bookImageUrl: {
        type: String,
        default: ""
    }
	
});

bookSchema.pre('save', async function (next) {

    if (!this.bookId) {
        const generateBookId = () => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let bookId = '';
            for (let i = 0; i < 8; i++) {
                bookId += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return bookId;
        };
        let newBookId;
        let isUnique = false;
        while (!isUnique) {
            newBookId = generateBookId();
            const existingBook = await this.constructor.findOne({ bookId: generateBookId()})
            if (!existingBook) {
                isUnique = true;
            }
        }
        this.bookId = newBookId;
    }
    next();
});

const Book = mongoose.model('Book', bookSchema, 'Books');

export default Book