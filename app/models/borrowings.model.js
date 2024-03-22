// borrowingModel.js
import mongoose from 'mongoose';

const borrowingSchema = new mongoose.Schema({
    borrowerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    borrowDate: {
        type: Date,
        default: Date.now
    },
    returnDate: Date,
    returned: {
        type: Boolean,
        default: false
    }
});

const Borrowing = mongoose.model('Borrowing', borrowingSchema, 'Borrowings');

export default Borrowing;
