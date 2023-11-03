import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import db from './config.mjs'; 


const app = express();
const port = 3001;

app.use(express.json())
app.use(express.json())
app.use(cors())
app.use(express.static('public'))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + '_' + path.extname(file.originalname)); // Rename the file
  },
});

const upload = multer({ storage:storage });


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
  });

app.post('/books', upload.single('cover'), (req, res) => {
  console.log(req.file)
  const { title, disc, price } = req.body;
  const cover = req.file.filename; // Get the filename of the uploaded file
  const sql = 'INSERT INTO books (title, disc, price, cover) VALUES (?, ?, ?, ?)';
  const values = [title, disc, price, cover];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err);
      res.status(500).json({ error: 'Error inserting data into the database' });
    } else {
      console.log('Data was Submitted Successfully !')
      res.status(200).json({ message: 'Book added successfully' });
    }
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