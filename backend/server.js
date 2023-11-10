import 'dotenv/config'
import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();
const port = 3008;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://0.0.0.0:27017/reactLoginDB');

const userSchema = new mongoose.Schema({
  name: String,
  dateofBirth: Date,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Registration API
app.post('/api/signup', async (req, res) => {
  const { name, date, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      dateofBirth: date,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Generate JWT
    const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.SECRET_KEY);

    // Respond with token and user information
    res.status(201).json({ token: token, user: newUser });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Login API
app.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY);

    // Respond with token and user information
    res.status(201).json({ token: token, user: user });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
