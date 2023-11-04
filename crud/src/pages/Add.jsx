import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Add() {
  const [formData, setFormData] = useState({
    title: '',
    disc: '',
    price: '',
    cover: null, // Change the initial value for the cover to null
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === 'file' ? e.target.files[0] : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.title.trim() === '' ||
      formData.disc.trim() === '' ||
      formData.price === '' ||
      formData.cover === null // Check if the cover is null
    ) {
      alert('Please fill in all fields');
      return;
    }
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('disc', formData.disc);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('cover', formData.cover);

      await axios.post("http://localhost:3001/books", formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='AddBook'>
      <h1>Add Book</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder='Title'
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="disc"
          placeholder='Description'
          value={formData.disc}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder='Price'
          value={formData.price}
          onChange={handleChange}
        />
        <input
          type="file" // Change the input type to "file" for cover image
          name="cover"
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Add;
