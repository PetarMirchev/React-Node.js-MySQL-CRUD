import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Add = () => {

  const [inputData, setInputData] = useState({
    title: "",
    desc: "",
    cover: "",
    price: null,
    rating: null,
  });

  //function to collect the data on fields
  const handleChange = (e) => {
    setInputData(prev => ({...prev, [e.target.name]: e.target.value }));
  }
  //console.log(inputData);


 //The useNavigate hook returns a function that lets you navigate ("/")
  const navigate = useNavigate();


  // function for sending collected data to DB:
  const handleClick = async (e) => {
    e.preventDefault(); //this line prevent refreshing the page after click
      try{
        await axios.post("http://localhost:8800/books", inputData)
        //after finish new data input navigate USER to home "/"
        navigate("/");
      } 
      catch(err) {
        console.log(err,"inputData Error!");
      }
  }

  

 


  return (
    <div className='form'>
      <h1>Add New Book</h1>
      <input type="text"  placeholder='title' onChange={handleChange} name='title'/>
      <input type="text"  placeholder='desc' onChange={handleChange} name='desc' />
      <input type="text"  placeholder='cover' onChange={handleChange} name='cover'/>
      <input type="number"  placeholder='price' onChange={handleChange} name='price'/>
      <input type="number"  placeholder='rating' onChange={handleChange} name='rating'/>
      <button className='formButton' onClick={handleClick}>Add NEW</button>
    </div>
  )
}

export default Add;