import { useEffect, useState } from "react";
import axois from "axios";
import BookForm from "./BookForm";

const BookList = () => {
  // Hooks
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editId, setEditId] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBooks();
  }, [page]);

  const fetchBooks = async () => {
    try {
      const result = await axois.get("http://localhost:3000/api/books/books", {
        params: { searchTerm, page },
      });
      setBooks(result.data.allBooks);
      setTotalPages(result.data.totalPages);
    } catch (error) {
      console.error("Error fetaching books:", error);
    }
  };

  const deleteBook = async (bookId) => {
    try {
      if (bookId) {
        await axois.delete(`http://localhost:3000/api/books/book/${bookId}`);
        fetchBooks();
      }
    } catch (error) {
      console.error("Error fetaching books:", error);
    }
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search the books"
        />
        <button onClick={() => fetchBooks()}>Search</button>
      </div>
      <ul>
        {books &&
          books.map((book) => (
            <li key={book._id}>
              {book.name} - {book.description} - {book.price} -{" "}
              {new Date(book.publishDate).toLocaleDateString()}
              {editId == book._id ? (
                <BookForm book={book} onSave={() => setPage(1)} />
              ) : (
                <button onClick={() => setEditId(book._id)}>Edit</button>
              )}
              <button onClick={() => deleteBook(book._id)}>Delete</button>
            </li>
          ))}
        {!books && <p>No Books</p>}
      </ul>

      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>
          {" "}
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default BookList;
