import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'
function Add() {
  const [formData, setFormData] = useState({
    title: '',
    disc: '',
    price: '',
    cover: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate(); // Fix missing function call

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.title.trim() === '' ||
      formData.disc.trim() === '' ||
      formData.price === '' ||
      formData.cover.trim() === ''
    ) {
      // You can display an error message or take appropriate action here
      alert('Please fill in all fields');
      return;
    }
    try {
      await axios.post("http://localhost:3001/books", formData);
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
          type="text"
          name="cover"
          placeholder='Cover'
          value={formData.cover}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Add;
