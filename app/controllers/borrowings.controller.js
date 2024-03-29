// borrowingController.js
import Borrowing from '../models/borrowings.model.js';

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
        console.log(req.body)
        // Create a new borrowing record
        const borrowing = await Borrowing.create({ borrowerId, bookId });
        // Update book status to "borrowed"
        const book = await Book.findByIdAndUpdate(
            bookId,
            { status: 'borrowed' }, 
            { isAvailable: false }
        );

        res.status(201).json({ success: true, borrowing });
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

        if (!borrowing) {
            return res.status(404).json({ success: false, message: 'Borrowing record not found' });
        }

        // Update book status to "available"
        const book = await Book.findByIdAndUpdate(
            borrowing.bookId,
            { status: 'available' }, // Assuming there's a field named 'status' in your Book model
            { isAvailable: true }
        );

        res.status(200).json({ success: true, borrowing });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};