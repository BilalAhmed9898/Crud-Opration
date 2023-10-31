// config.mjs
import mysql from 'mysql';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'books',
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    process.exit(1); // Exit the application if the connection fails
  }
  console.log('Connected to MySQL database');
});

export default connection;
