import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {

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


  //useLocation hook to get the ID (number) of book to Update
  const location = useLocation();
  //to get specific ID - take 'pathname' & .split by "/" & get final number/id in the array([2]) 
  //console.log(location.pathname.split("/")[2]);
  const bookId = location.pathname.split("/")[2];




  // function for sending collected data to DB & Update:
  const handleClick = async (e) => {
    e.preventDefault(); //this line prevent refreshing the page after click
      try{
        await axios.put("http://localhost:8800/books/" + bookId, inputData);
        //after finish new data input navigate USER to home "/"
        navigate("/");
      } 
      catch(err) {
        console.log(err,"inputData Error!");
      }
  }

  

 


  return (
    <div className='form'>
      <h1>Update the Book</h1>
      <input type="text"  placeholder='title' onChange={handleChange} name='title'/>
      <input type="text"  placeholder='desc' onChange={handleChange} name='desc' />
      <input type="text"  placeholder='cover' onChange={handleChange} name='cover'/>
      <input type="number"  placeholder='price' onChange={handleChange} name='price'/>
      <input type="number"  placeholder='rating' onChange={handleChange} name='rating'/>
      <button className='formButton' onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update;