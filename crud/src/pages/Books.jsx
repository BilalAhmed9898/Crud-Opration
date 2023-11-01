import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, link} from 'react-router-dom';

import '../App.css';

function Books() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3001/");
        setData(res.data);
        console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllBooks();
  }, []);

  // const deletebook = (id) => {
  //   console.log(id); // Log the ID of the book
  // };

  return (
    <div className='main'>
      {data.map((item, i) => (
        <div className='card' key={i}>
          <h2>Book Id: {item.id}</h2>
          {/* <button onClick={() => deletebook(item.id)}>Delete</button> Pass the ID as a parameter */}
          <h2>{item.title}</h2>
          <h4>{item.disc}</h4>
          <h6>{item.cover}</h6>
        </div>
      ))}
      <button><Link to="/Add">Add Book</Link></button>
    </div>
  );
}

export default Books;
