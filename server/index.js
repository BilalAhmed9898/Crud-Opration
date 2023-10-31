import express from "express";

const app = express();
const port = 8081;

// Define a route that responds with text
app.get("/", (req, res) => {
    res.send("Hello, World!"); // This text will be displayed on the screen
});
// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
