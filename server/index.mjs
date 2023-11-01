import express from "express";
import cors from "cors";
import db from './config.mjs'; 

const app = express();
const port = 3001;

app.use(express.json())
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
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
  
  // app.post("/books", (req, res) => {
  //   const q = "INSERT INTO books (`title`,`disc`,`price`,`cover`) VALUES (?, ?, ?, ?)";
  //   const values = [
  //     req.body.title,
  //     req.body.disc,
  //     req.body.price,
  //     req.body.cover,
  //   ];
  //   console.log("Inserting values:", values); // Log the values
  
  //   db.query(q, [values], (err, data) => {
  //     if (err) {
  //       console.error('Error executing the query:', err);
  //       return res.status(500).json({ error: 'Error executing the query' });
  //     }
  
  //     console.log("Data has been sent successfully"); // Log success
  //     return res.json("Data has been sent successfully");
  //   });
  // });    
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});