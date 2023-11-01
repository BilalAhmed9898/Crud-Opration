import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    try {
      await axios.post("http://localhost:3001/books", formData);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='form'>
      <h1>Add Book</h1>
      <form onSubmit={handleSubmit}>
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
