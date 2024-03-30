import mongoose from 'mongoose';
import Book from './book.model.js'; 

const borrowingSchema = new mongoose.Schema({
    borrowerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Books',
        required: true
    },
    borrowDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        default: function() {
            return new Date(Date.now() + 10 * 24 * 60 * 60 * 1000); // Set due date to 10 days from current date
        }
    },
    returnDate: {
        type: Date,
        default: null // Default value for returnDate
    },
    returned: {
        type: Boolean,
        default: false
    }
});

const Borrowing = mongoose.model('Borrowing', borrowingSchema, 'Borrowings');

export default Borrowing;
