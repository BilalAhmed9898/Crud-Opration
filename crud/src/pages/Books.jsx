import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../App.css';

function Books() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [sortBy, setSortBy] = useState('asc'); // Default sorting is ascending

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3001/");
        setData(res.data);
        setFilteredData(res.data); // Initialize filteredData with all books
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Error fetching books. Please check the server.");
      }
    };

    fetchAllBooks();
  }, []);

  const handledelete = async (id) => {
    console.log(id);
    try {
      await axios.delete("http://localhost:3001/books/" + id);
      window.location.reload();
      alert("Book has been Deleted!");
    } catch (err) {
      console.error("Error deleting book:", err);
      setError("Error deleting the book. Please check the server.");
    }
  };

  useEffect(() => {
    const filteredBooks = data.filter((book) =>
      book.title.toLowerCase().includes(filterText.toLowerCase())
    );

    // Sort the filtered books based on price
    if (sortBy === 'asc') {
      filteredBooks.sort((a, b) => a.price - b.price)
    }
    else if (sortBy === 'desc') {
      filteredBooks.sort((a, b) => b.price - a.price)
    }


    setFilteredData(filteredBooks);
  }, [data, filterText, sortBy]);

  const toggleSortOrder = () => {
    setSortBy(sortBy === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="mainpage">
      <h1>Books Available in Store!</h1>
     <div className='functions'>
     <input
        type="text"
        placeholder="Search by book name"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <button onClick={toggleSortOrder}>
        Sort {sortBy === 'asc' ? 'Ascending' : 'Descending'}
      </button>
      <button>
        <Link to="/Add">Add Book</Link>
      </button>
     </div>
      <div className="main">
        {filteredData.map((item, i) => (
          <div className="card" key={i}>
            <img src={`http://localhost:3001/images/` + item.cover} alt="" />
            <h3>{item.title}</h3>
            <p>{item.disc}</p>
            <p>
              <b>Rs {item.price}/=</b>
            </p>
            <button className="delete" onClick={() => handledelete(item.id)}>
              Delete
            </button>
            <button className="update">
              <Link to={`/Edit/${item.id}`}>Update</Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;
