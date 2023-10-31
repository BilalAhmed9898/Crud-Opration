import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Books() {
  const [data, setData] = useState([]); // Initialize data as an empty array

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8081/"); // Make sure the URL is correct
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllBooks();
  }, []);

  return (
    <div>
      {data.map((item, i) => (
        <div key={i}>
          <h2>{item.title}</h2>
          <h4>{item.disc}</h4>
          <h6>{item.cover}</h6>
        </div>
      ))}
    </div>
  );
}

export default Books;
