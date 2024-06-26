import Book from '../models/book.model.js';
import Borrowing from '../models/borrowings.model.js';
// Create a new book
const createBook = async (req, res) => {
    try {
		console.log(req.body);
        const { title, author, ISBN, genre, publication_year, quantity_available, status, available, bookImageUrl } = req.body;
        const book = new Book({ title, author, ISBN, genre, publication_year, quantity_available, status, available, bookImageUrl });
        const savedBook = await book.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all books
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get book by ID
const getBookById = async (req, res) => {
    try {
        const bookId = req.params.id;

        // Find the book by ID
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Find the latest borrowing record for the book
        const latestBorrowing = await Borrowing.findOne({ bookId }).sort({ borrowDate: -1 });

        // Include the latest borrowing record in the response
        const bookWithLatestBorrowing = {
            ...book.toObject(), // Convert book object to plain JavaScript object
            latestBorrowing: latestBorrowing || null // Add latest borrowing or null if not found
        };

        res.json(bookWithLatestBorrowing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update book by ID
const updateBook = async (req, res) => {
    try {
        // const { name, bio, birthDate } = req.body;
        const book = await Book.findByIdAndUpdate(
            req.params.id,
           req.body,
            { new: true }
        );
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete book by ID
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Search books by genre
const searchBooksByGenre = async (req, res) => {
    try {
        const { genre } = req.query;
        const books = await Book.find({ genre: { $regex: new RegExp(genre, 'i') } });
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Search books by keyword
const searchBooksByKeyword = async (req, res) => {
    try {
        const { keyword } = req.query;
        const books = await Book.find({
            $or: [
                { title: { $regex: keyword.toString(), $options: 'i' } },
                { author: { $regex: keyword.toString(), $options: 'i' } },
                { genre: { $regex: keyword.toString(), $options: 'i' } }
            ]
        });
        
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get random books
const getRandomBooks = async (req, res) => {
    try {
        // Logic to fetch random books (e.g., select a random subset from the database)
        const randomBooks = await Book.aggregate([{ $sample: { size: 5 } }]);
        res.json(randomBooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export default { 
    createBook, 
    getAllBooks, 
    getBookById, 
    updateBook,
    deleteBook,
    searchBooksByGenre,
    searchBooksByKeyword,
    getRandomBooks
};
