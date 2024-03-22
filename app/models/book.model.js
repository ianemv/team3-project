import mongoose from 'mongoose';

// Define Book schema
const bookSchema = new mongoose.Schema({
    book_id: {
        type: String,
        required: true
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
	
});

bookSchema.pre('save', function (next) {
    if (!this.isNew) {
        return next();
    }

    const generateBookId = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let book_id = '';
        for (let i = 0; i < 8; i++) {
            book_id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return book_id;
    };

    this.book_id = generateBookId();
    next();
});

const Book = mongoose.model('Book', bookSchema, 'Books');

export default Book