import express from "express";
import mysql from "mysql";
import cors from 'cors';


//call express
const app = express();



//MySQL connection to DB (new_schema_test)
const DBCall= mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "root",
    database:"new_schema_test"
});
//if there is a auth problem in -->  app.get("/books",....)
// Execute the following query in MYSQL Workbench:
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root(password)'; <-----
//Where root as your user localhost as your URL and password as your password
//Then run this query to refresh privileges:
//flush privileges;  <----
//Try connecting using node after you do so.
//If that doesn't work, try it without @'localhost' part.




// !!!!!!!!!!!!!!!!!!!!!!! //
//middleware -- allow us to send JSON (from POSTMAN for example) data to EXPRESS server:
app.use(express.json());


//CORS middleware ---> hear can be make specified domains to be used or make black list 
app.use(cors());




//******************************************************************************************************* */

//home endpoint
app.get("/", (req,res) => {
    res.json("hello this is BackEnd server!");
});


//query to DB to show all books in:
app.get("/books", (req,res) =>{
   const queryDB = "SELECT * FROM new_schema_test.books" //this line (queryDB) is pass in DB to be executed
   DBCall.query(queryDB, (err, data) => {
    //if is ERR return the Error:
    if(err){
        console.log(err);
        return res.json(err);
    } 
    //no Error return Data in DB:
    return res.json(data);
   });
});



//create book
app.post("/books", (req,res) =>{
    const qDB = "INSERT INTO books (`title`,`desc`,`cover`,`price`,`rating`) VALUES (?)"
    const insertValues = [
        req.body.title, // "title": "Title from backend",
        req.body.desc,// "desc": "saasd from backend", 
        req.body.cover,// "cover": "pic from backend",
        req.body.price,// "price": "33",
        req.body.rating,// "rating": "3",
    ];

    DBCall.query(qDB, [insertValues], (err, data) => {
        if(err) return res.json(err);
        
        return res.json("Book has been created - status 200 OK"); //return res.json(data);
    });
});




//delete endpoint
app.delete("/books/:id", (req, res) => {
    const bookID = req.params.id;
    const queryDelete = "DELETE FROM books WHERE id = ?";

    DBCall.query(queryDelete, [bookID], (err, data) => {
        //if error --> return error
        if(err) return res.json(err);  
        //if is OK --> Delete book
        return res.json("Book has been DELETED! - status 200 OK"); //return res.json(data);
    });
})




//Update book endpoint
app.put("/books/:id", (req, res) => {
    const bookID = req.params.id;
    const queryUpdate = "UPDATE books SET `title` = ?, `desc` = ?, `cover` = ?, `price` = ?, `rating` = ? WHERE id = ?";

    const insertChangedValues = [
        req.body.title, // "title": "Title from backend",
        req.body.desc,// "desc": "saasd from backend", 
        req.body.cover,// "cover": "pic from backend",
        req.body.price,// "price": "33",
        req.body.rating,// "rating": "3",
    ];

    DBCall.query(queryUpdate, [...insertChangedValues, bookID], (err, data) => {
        //if error --> return error
        if(err) return res.json(err);  
        //if is OK --> Delete book
        return res.json("Book has been UPDATE successfully."); //return res.json(data);
    });
});



//////////////////////////////////////////////////////////

app.listen(8800, ()=> {
    console.log("Connected to backend!");
});



/////////////////////////////////////////////////////////////////////////////////////////////////////////

//npm init -y
//npm i express
//npm i mysql
//npm i nodemon
//npm i cors
