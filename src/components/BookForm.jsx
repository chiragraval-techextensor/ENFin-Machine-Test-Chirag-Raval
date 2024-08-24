import { useState } from "react";
import axois from "axios";

const BookForm = ({ book = {}, onSave }) => {
  // Hooks
  const [name, setName] = useState(book.name || "");
  const [description, setDescription] = useState(book.description || "");
  const [publishDate, setPublishDate] = useState(book.publishDate || "");
  const [price, setPrice] = useState(book.price || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookFormData = { name, description, publishDate, price };

    try {
      if (book._id) {
        await axois.put(`http://localhost:3000/api/books/book/${book._id}`, bookFormData);
      } else {
        await axois.post(`http://localhost:3000/api/books/book`, bookFormData);
      }
    } catch (error) {
      console.error("Error fetaching books:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 broder rounded-lg shadow-md">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Book Name"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter Description"
        required
      ></textarea>
      <input
        type="date"
        value={publishDate}
        onChange={(e) => setPublishDate(e.target.value)}
        placeholder="Enter Publish Date"
        required
      />
      <input
        type="number"
        min={1}
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter Price"
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default BookForm;
