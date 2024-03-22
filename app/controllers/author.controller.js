import Author from '../models/author.model.js';
// Create a new author
const createAuthor = async (req, res, next) => {
    try {
		console.log(req.body);
        const { bio, birthDate, firstName, lastName } = req.body;
        const author = new Author({ firstName, lastName, bio, birthDate });
        const savedAuthor = await author.save();
        res.status(201).json(savedAuthor);
		next();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all authors
const getAllAuthors = async (req, res, next) => {
    try {
        const authors = await Author.find();
        res.json(authors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get author by ID
const getAuthorById = async (req, res, next) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.json(author);
		next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update author by ID
const updateAuthor = async (req, res) => {
    try {
        const { name, bio, birthDate } = req.body;
        const author = await Author.findByIdAndUpdate(
            req.params.id,
            { name, bio, birthDate },
            { new: true }
        );
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.json(author);
		next();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete author by ID
const deleteAuthor = async (req, res) => {
    try {
        const author = await Author.findByIdAndDelete(req.params.id);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.json({ message: 'Author deleted successfully' });
		next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default { createAuthor, getAllAuthors, getAuthorById, updateAuthor, deleteAuthor };
