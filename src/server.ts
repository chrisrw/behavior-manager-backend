import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import pool from './db';
const bcrypt = require('bcrypt');
const app = express();
const port = 3001;

// Parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3000' }));

// GET route for fetching data
app.get('/data', async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM "infractions"');
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// POST route for adding infractions
app.post('/data/infractions', async (req: Request, res: Response) => {
  const { student_name, student_number, date, period, incident_description } = req.body;
  if (!student_number) {
    return res.status(400).json({ error: 'Missing student_number in the request body.' });
  }

  const query = 'INSERT INTO "infractions" (student_name, student_number, date, period, incident_description) VALUES ($1, $2, $3, $4, $5)';

 
  try {
    await pool.query(query, [student_name, student_number, date, period, incident_description]);
    res.status(200).json({ message: 'Incident added successfully.' });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// DELETE route for deleting infractions
app.delete('/data/infractions/:student_number', async (req: Request, res: Response) => {
  const { student_number } = req.params;

  const query = 'DELETE FROM "infractions" WHERE student_number = $1';

  try {
    await pool.query(query, [student_number]);
    res.status(200).json({ message: 'Incident deleted successfully.' });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


// PUT route for updating infractions
app.put('/data/infractions/:student_number', async (req: Request, res: Response) => {
  const { student_number } = req.params;
  const { student_name, date, period, incident_description } = req.body;

  const query = 'UPDATE "infractions" SET student_name = $1, date = $2, period = $3, incident_description = $4 WHERE student_number = $5';

  try {
    await pool.query(query, [student_name, date, period, incident_description, student_number]);
    res.status(200).json({ message: 'Incident updated successfully.' });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Registration endpoint
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body, 'req body')
  try {
    // Check if the user already exists
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert the user into the database
    await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashedPassword]);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Login endpoint
app.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password in the database
    const isValidPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Login successful
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});