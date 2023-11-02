import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import '../App.css';

function Books() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3001/books");
        setData(res.data);
        console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllBooks();
  }, []);
  const handledelete = async(id)=>{
    try{
     await axios.delete("http://localhost:3001/books/"+id)
     window.location.reload();
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <div className='main'>
      {data.map((item, i) => (
        <div className='card' key={i}>
          <img src={item.cover} alt="" />
          <h2>{item.title}</h2>
          <h4>{item.disc}</h4>
          <h6>{item.cover}</h6>
          <button onClick={()=> handledelete(item.id)}>Delete</button>
          <button><Link to={`/Edit/${item.id}`}>Update</Link></button>
        </div> 
      ))}
      <button><Link to="/Add">Add Book</Link></button>
    </div>
  );
}

export default Books;
