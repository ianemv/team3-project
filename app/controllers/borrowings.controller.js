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
        const { borrowingId } = req.params;

        // Find borrowing record by ID and update returnDate and returned status
        const borrowing = await Borrowing.findByIdAndUpdate(
            borrowingId,
            { returnDate: Date.now(), returned: true },
            { new: true }
        );

        if (!borrowing || borrowing.returned) {
            return res.status(404).json({ success: false, message: 'Borrowing record not found or already returned' });
        }
        // Update book status to "available"
        let book = await Book.findById(borrowing.bookId);
        book = extend(book, { status: "available", available: true })
        await book.save();

        res.status(200).json({ success: true, borrowing, book });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};