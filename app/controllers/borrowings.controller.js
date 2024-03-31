// borrowingController.js
import mongoose from 'mongoose';
import Borrowing from '../models/borrowings.model.js';
import Book from '../models/book.model.js'; 
import extend from 'lodash/extend.js'

// Fetch all borrowings
export const getAllBorrowings = async (req, res) => {
    try {
        const borrowings = await Borrowing.find().populate('borrowerId').populate('bookId');
        res.status(200).json(borrowings);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Controller for handling borrowings
export const borrowBook = async (req, res) => {
    try {
        const { borrowerId, bookId } = req.body;
        // Create a new borrowing record
        const borrowing = await Borrowing.create({ borrowerId, bookId });

        let book = await Book.findById(bookId);
        // Update book status to "borrowed" and isAvailable to false
        book = extend(book, { status: "borrowed", available: false })
        await book.save();

        res.status(201).json({ success: true, borrowing, book });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const returnBook = async (req, res) => {
    try {
        const { bookId } = req.params;

        // Find the latest borrowing record for the specified book ID
        const borrowing = await Borrowing.findOne({ bookId }).sort({ borrowDate: -1 });

        if (!borrowing || borrowing.returned) {
            return res.status(404).json({ success: false, message: 'No active borrowing record found for the book' });
        }
        
        // Update borrowing record with returnDate and returned status
        borrowing.returnDate = Date.now();
        borrowing.returned = true;
        await borrowing.save();

        // Update book status to "available"
        let book = await Book.findById(bookId);
        if (book) {
            book.status = "available";
            book.available = true;
            await book.save();
        } else {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }

        res.status(200).json({ success: true, borrowing, book });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
