const express = require("express");
const Book = require("../models/Book");

const router = express.Router();

// To create a new book
router.post("/book", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).send(book);
  } catch (err) {
    res.status(400).send(err);
  }
});

// For get all books with pagination & search

router.get("/books", async (req, res) => {
  try {
    const { searchTerm, page = 1, limit = 10 } = req.query;

    const regex = new RegExp(searchTerm, "i");
    const searchedQuery = {
      $or: [{ name: regex }, { description: regex }],
    };

    const allBooks = await Book.find(searchedQuery)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const bookCounts = await Book.countDocuments(searchedQuery);

    res.status(201).send({
      allBooks,
      totalPages: Math.ceil(bookCounts / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// To get book by ID
router.get("/book/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send();
    res.status(201).send(book);
  } catch (err) {
    res.status(400).send(err);
  }
});

// To update book by id
router.put("/book/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) return res.status(404).send();
    res.status(201).send(book);
  } catch (err) {
    res.status(400).send(err);
  }
});

// To delete book by id
router.delete("/book/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).send();
    res.status(201).send(book);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
