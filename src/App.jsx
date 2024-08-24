import { Routes, Route, Link } from "react-router-dom";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";

const App = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Book List</Link>
          </li>
          <li>
            <Link to="/add">Add Book</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/add" element={<BookForm />} />
      </Routes>
    </div>
  );
};

export default App;
