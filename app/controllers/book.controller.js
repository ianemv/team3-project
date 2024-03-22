import Book from '../models/book.model.js';
// Create a new book
const createBook = async (req, res) => {
    try {
		console.log(req.body);
        const { title, author, ISBN, genre, publication_year, quantity_available } = req.body;
        const book = new Book({ title, author, ISBN, genre, publication_year, quantity_available });
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
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
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

export default { createBook, getAllBooks, getBookById, updateBook, deleteBook };
