import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../App.css';

function Books() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3001/books");
        setData(res.data);
        console.log(res.data[10].cover)
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Error fetching books. Please check the server.");
      }
    };

    fetchAllBooks();
  }, []);

  const handledelete = async (id) => {
    try {
      await axios.delete("http://localhost:3001/books/" + id);
      window.location.reload();
    } catch (err) {
      console.error("Error deleting book:", err);
      setError("Error deleting the book. Please check the server.");
    }
  }

  if (error) {
    return (
      <div className="mainpage">
        <h1>Book Available in Store!</h1>
        <p>{error}</p>
        <button><Link to="/Add">Add Book</Link></button>
      </div>
    );
  }

  return (
    <div className="mainpage">
      <h1>Book Available in Store!</h1>
      <div className='main'>
        {data.map((item, i) => (
          <div className='card' key={i}>
            <img src={item.cover} alt="" />
            <h3>{item.title}</h3>
            <p>{item.disc}</p>
            <p>Rs {item.price}/=</p>
            <button className='delete' onClick={() => handledelete(item.id)}>Delete</button>
            <button className='update'><Link to={`/Edit/${item.id}`}>Update</Link></button>
          </div>
        ))}
      </div>
      <button><Link to="/Add">Add Book</Link></button>
    </div>
  );
}

export default Books;
