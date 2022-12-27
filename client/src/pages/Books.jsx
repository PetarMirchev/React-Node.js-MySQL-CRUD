import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


const Books = () => {

  const [books, setBooks] = useState([]);


  //load all books from backend
  useEffect( () => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        console.log(res);
        setBooks(res.data);
      } catch(err) {
          console.log(err);
        }
    }
    fetchAllBooks();
  }, []); // empty '[]' runs only 1 time




  //delete function, passing ID of the book to BackEnd
  const handleDelete =  async (id) =>{
    try{
      await axios.delete("http://localhost:8800/books/" + id);
      //when everything is ok page will be refreshed
      window.location.reload(); // in production will be used REDUX or others management tools
    } catch(err){
      console.log(err, "Error on DELETE attempt!");
    }

  }


  return (
    <div>
      <h1>/ Pepi Book Shop :) /</h1>
      <div className="books">
        {books.map(book => (
          <div className="book" key={book.id}>

            {/* if is no IMG of the cover don't show picture */}
            {book.cover && <img src={book.cover} alt="" />}

            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <p>{book.ratings}</p>
            <span>{book.price}</span>
            <button className='delete' onClick={() => handleDelete(book.id)}>Delete</button>
            <button className='update'><Link to={`/update/${book.id}`}>Update</Link></button>
          </div>
        ))}
      </div>
          <button><Link to="/add">Add new Book</Link></button>
    </div>
  )
}

export default Books;

