import express from "express";
import cors from "cors";
import db from './config.mjs'; 

const app = express();
const port = 3001;

app.use(express.json())
app.use(express.json())
app.use(cors())

app.get('/books', (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) {
      console.error('Error executing the query:', err);
      return res.status(500).json({ error: "Error Occurred" });
    }
    // console.log(data)
    return res.json(data);
  });
  app.post('/books', (req, res) => {
    const q = "INSERT INTO books(`title`, `disc`, `price`, `cover`) VALUES (?)";
    const values = [
      req.body.title,
      req.body.disc,
      req.body.price,
      req.body.cover,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
});

 app.put("/books/:id",(req,res)=>{
   const bookId =req.params.id;
   const q = "UPDATE books SET `title`=? ,`disc`=? , `price`= ? ,`cover`=? WHERE id = ? "
   const values = [
    req.body.title,
    req.body.disc,
    req.body.price,
    req.body.cover,
  ];
   db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json("Book has been Updated Successfully !");
  });
 })

 app.delete("/books/:id",(req,res)=>{
   const bookId =req.params.id;
   const q = "DELETE FROM books WHERE id = ?"
   db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json("Book Deleted Successfully ! ");
  });
 })




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});